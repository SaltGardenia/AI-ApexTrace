// 数据管线统一入口：提取节点 → 采集 → 合成 → 抓指标 → 合并。
// CI 中由 GitHub Action 调用（npm run pipeline）。
// 设计原则：每一步可独立断点续跑；整体失败不抛错退出（让 CI 仍能提交已拿到的数据并部署）。
import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";
import { fileURLToPath } from "url";

const exec = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");

async function step(name, file) {
  console.log(`\n##### ${name} (${file}) #####`);
  try {
    const { stdout } = await exec("node", [path.join(__dirname, file)], {
      cwd: ROOT,
      maxBuffer: 64 * 1024 * 1024,
      timeout: 55 * 60 * 1000, // 单步最长 55 分钟，避免 CI 整体超时
    });
    process.stdout.write(stdout);
    console.log(`✓ ${name} 完成`);
  } catch (e) {
    console.error(`✗ ${name} 失败:`, e.message);
    if (e.stdout) process.stdout.write(e.stdout);
    if (e.stderr) process.stderr.write(e.stderr);
    // 不阻断：后续步骤仍可基于已有缓存运行
  }
}

async function main() {
  const t0 = Date.now();
  await step("提取领域树节点", "extract-nodes.mjs");
  await step("采集多源原始计数", "lib/collect.mjs");
  await step("合成 paperCount + 置信度", "lib/synthesize.mjs");
  await step("抓取末级真实指标(年份/来源/引用/开放率)", "metrics.mjs");
  await step("合并指标产物", "merge-metrics.mjs");
  const sec = ((Date.now() - t0) / 1000).toFixed(0);
  console.log(`\n===== 管线完成，耗时 ${sec}s =====`);
}

main();
