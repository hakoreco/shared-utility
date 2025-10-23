/**
 * データが`boolean`型かチェックする。
 *
 * @param {unknown} data 渡されるデータ
 *
 * @return {boolean}
 */
export function isBoolean(data: unknown): data is boolean {
  return typeof data === "boolean";
}
