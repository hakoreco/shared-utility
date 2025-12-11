import { describe, expect, test } from "vitest";
import { isNumber } from "@/ts-utility";

describe("isNumber", () => {
  test("数字を渡す", () => {
    expect(isNumber(0)).toBe(true);
    expect(isNumber(1)).toBe(true);
  });

  test("数字以外のデータを渡す", () => {
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber(false)).toBe(false);
    expect(isNumber("1")).toBe(false);
    expect(isNumber([])).toBe(false);
    expect(isNumber({})).toBe(false);
  });
});
