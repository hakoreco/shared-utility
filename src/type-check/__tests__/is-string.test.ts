import { describe, expect, test } from "vitest";
import { isString } from "@/index";

describe("isString", () => {
  test("文字列を渡す", () => {
    expect(isString("123")).toBe(true);
  });

  test("文字列以外のデータを渡す", () => {
    expect(isString(undefined)).toBe(false);
    expect(isString(0)).toBe(false);
    expect(isString(false)).toBe(false);
    expect(isString(1)).toBe(false);
    expect(isString([])).toBe(false);
    expect(isString({})).toBe(false);
  });
});
