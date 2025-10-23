/**
 * データが`undefined`型かチェックする。主に`number`型の`0`などの`falsy`なデータの未定義チェックを行いたい場合に使用する
 *
 * @param {unknown} data 渡されるデータ
 *
 * @return {boolean}
 */
export function isUndefined(data: unknown): data is undefined {
  return typeof data === "undefined";
}
