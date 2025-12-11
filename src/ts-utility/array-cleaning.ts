export type RemovableValues = false | null | undefined;

/**
 * 配列から `undefined`・`null`・`false` を取り除き、残りの要素を返す。
 *
 * @typeParam T なんでもいい
 * @param items - フィルタリング対象の配列
 * @returns falsy 値（`false`・`null`・`undefined`）を取り除いた新しい配列
 */
export function arrayCleaning<T>(
  items: readonly T[],
): Exclude<T, RemovableValues>[] {
  return items.filter((item): item is Exclude<T, RemovableValues> => {
    return item !== undefined && item !== null && item !== false;
  });
}
