import { describe, expect, test } from "vitest";
import { castToNumber } from "@/ts-utility";

describe("castToNumber", () => {
  test("Falsyなデータを渡す", () => {
    expect(castToNumber(undefined)).toBeUndefined();
    expect(castToNumber(false)).toBeUndefined();
    expect(castToNumber(null)).toBeUndefined();
    expect(castToNumber(undefined, 5)).toBe(5);
    expect(castToNumber(0)).toBe(0);
  });

  test("数値に変換可能なデータを渡す", () => {
    expect(castToNumber(1)).toBe(1);
    expect(castToNumber("10")).toBe(10);
    expect(castToNumber("3", 5)).toBe(3);
    expect(castToNumber("3.7")).toBe(3.7);
    expect(castToNumber("0.5")).toBe(0.5);
  });

  test("数値に変換不可能なデータを渡す", () => {
    expect(castToNumber("example")).toBeUndefined();
    expect(
      castToNumber(() => {
        return;
      }),
    ).toBeUndefined();
    expect(castToNumber(class Example {})).toBeUndefined();
  });
});