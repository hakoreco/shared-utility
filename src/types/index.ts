/**
 * 渡された数字を0から並べてユニオン型にする
 *
 * @typeParam Max >=0 最大の数字
 * @typeParam IncrementalInt >=0 数字の配列（lengthで使うため）
 */
export type IntEnumerate<
  Max extends number,
  IncrementalInt extends number[] = [],
> = IncrementalInt["length"] extends Max
  ? IncrementalInt[number] | Max
  : IntEnumerate<Max, [...IncrementalInt, IncrementalInt["length"]]>;

/**
 * 数字を+1する
 *
 * @typeParam Int >=0 数字
 */
export type PlusOne<
  Int extends number,
  IncrementalInt extends number[] = [],
> = IncrementalInt["length"] extends Int
  ? [...IncrementalInt, ""]["length"]
  : PlusOne<Int, [...IncrementalInt, IncrementalInt["length"]]>;

/**
 * 指定した数字の範囲（以上／以下）でユニオン型を作成する
 *
 * @typeParam Min >=0 最低の数字
 * @typeParam Max >=0 最大の数字
 */
export type MinMax<Min extends number, Max extends number> =
  | Exclude<IntEnumerate<Max>, IntEnumerate<Min>>
  | Min;

/**
 * 渡された数字が対象の数字未満か判別する
 *
 * @typeParam Int >=0 対象の数字
 * @typeParam Max >=0 この数字未満の判定をする
 */
export type LessThan<
  Int extends number,
  Max extends number,
> = IntEnumerate<Int> extends Exclude<IntEnumerate<Max>, Max> ? true : false;

/**
 * 渡された数字が対象の数字以下か判別する
 *
 * @typeParam Int >=0 対象の数字
 * @typeParam Max >=0 この数字以下の判定をする
 */
export type LessThanOrEqual<
  Int extends number,
  Max extends number,
> = IntEnumerate<Int> extends IntEnumerate<Max> ? true : false;

/**
 * 渡された数字が対象の数字超えか判別する
 *
 * @typeParam Int >=0 対象の数字
 * @typeParam Min >=0 この数字超えか判定をする
 */
export type GreaterThan<Int extends number, Min extends number> =
  | IntEnumerate<Min>
  | PlusOne<Min> extends IntEnumerate<Int>
  ? true
  : false;

/**
 * 渡された数字が対象の数字以上か判別する
 *
 * @typeParam Int >=0 対象の数字
 * @typeParam Min >=0 この数字以上の判定をする
 */
export type GreaterThanOrEqual<
  Int extends number,
  Min extends number,
> = IntEnumerate<Min> extends IntEnumerate<Int> ? true : false;
