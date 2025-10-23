/**
 * データが`string`型かチェックする。
 *
 * @param {unknown} data 渡されるデータ
 *
 * @return {boolean}
 */
export function isString(data: unknown): data is string {
  return typeof data === "string";
}
