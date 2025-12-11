/**
 * 渡された数字を0から並べてユニオン型にする
 */
type IntEnumerate<Max extends number, I extends number[] = []> = I["length"] extends Max ? I[number] | Max : IntEnumerate<Max, [...I, I["length"]]>;
/**
 * 指定した数字の範囲（以上／以下）でユニオン型を作成する
 */
type MinMax<Min extends number, Max extends number> = Exclude<IntEnumerate<Max>, IntEnumerate<Min>> | Min;

export type { IntEnumerate, MinMax };
