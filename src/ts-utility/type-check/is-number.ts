/**
 * データが`number`型かチェックする。
 *
 * @param {unknown} data 渡されるデータ
 *
 * @return {boolean}
 */
export function isNumber(data: unknown): data is number {
  return typeof data === "number";
}
