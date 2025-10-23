import { describe, expect, test } from "vitest";
import { isUndefined } from "@/index";

describe("isUndefined", () => {
  test("Undefinedを渡す", () => {
    expect(isUndefined(undefined)).toBe(true);
  });

  test("Undefined以外のデータを渡す", () => {
    expect(isUndefined(0)).toBe(false);
    expect(isUndefined(false)).toBe(false);
    expect(isUndefined(1)).toBe(false);
    expect(isUndefined("1")).toBe(false);
    expect(isUndefined([])).toBe(false);
    expect(isUndefined({})).toBe(false);
  });
});
