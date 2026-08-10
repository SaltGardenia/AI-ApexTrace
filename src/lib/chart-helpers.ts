// 自适应数量格式化：小于 1 万时显示原始整数，否则用「k」表示千。
// 叶子级 yearly 数值很小（几百~两三千），旧写法 `Math.round(v/1000)+"k"`
// 会把 200 显示成 "0k"、2600 显示成 "3k"，属于错误刻度，故统一收敛到此函数。
export function formatCount(v: number): string {
  if (!Number.isFinite(v)) return "0";
  if (v >= 10000) return `${Math.round(v / 1000)}k`;
  return `${Math.round(v)}`;
}
