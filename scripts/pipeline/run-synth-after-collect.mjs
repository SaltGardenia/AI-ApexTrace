// 等待 collect.mjs 完成，然后跑 synthesize，产出前端数据集。
import { spawn } from "child_process";
import { existsSync, readFileSync } from "fs";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function run(cmd, args, cwd) {
  return new Promise((resolve) => {
    const p = spawn(cmd, args, { cwd, stdio: "inherit" });
    p.on("exit", (code) => resolve(code));
  });
}

async function main() {
  // 若 collect 还在跑，等它结束
  while (true) {
    try {
      const out = spawn("pgrep", ["-f", "collect.mjs"]);
      let alive = false;
      out.on("exit", (c) => {});
      // 简化：直接检查缓存数是否达到 70
      const n = require("fs").readdirSync("scripts/pipeline/cache").length;
      if (n >= 70) break;
      console.log(`collect 进行中，缓存 ${n}/70，等待 20s...`);
      await sleep(20000);
    } catch {
      break;
    }
  }
  console.log("=== 运行合成层 ===");
  await run("node", ["scripts/pipeline/lib/synthesize.mjs"], ".");
  console.log("=== 完成 ===");
}
main();
