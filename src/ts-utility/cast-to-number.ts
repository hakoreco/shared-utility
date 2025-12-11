/**
 * 与えられた値を整数に変換する。変換できない場合はフォールバック値、もしくは `undefined` を返す。
 *
 * @param data - 数値化を試みる値
 * @param fallbackData - 変換に失敗した際に返すフォールバック値
 * @returns 変換後の数値、またはフォールバック値／`undefined`
 */
export function castToNumber(data: unknown): number | undefined;
export function castToNumber(data: unknown, fallbackData: number): number;
export function castToNumber(
  data: unknown,
  fallbackData?: number,
): number | undefined {
  if (typeof data === "number") {
    return data;
  }

  if (typeof data === "string") {
    const parsedData = Number.parseInt(data, 10);
    if (!Number.isNaN(parsedData)) {
      return parsedData;
    }
  }

  return fallbackData;
}
