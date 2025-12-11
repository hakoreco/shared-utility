import { describe, expect, test } from "vitest";
import { isBoolean } from "@/ts-utility";

describe("isBoolean", () => {
  test("真偽値を渡す", () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
  });

  test("真偽値以外のデータを渡す", () => {
    expect(isBoolean(undefined)).toBe(false);
    expect(isBoolean(0)).toBe(false);
    expect(isBoolean(1)).toBe(false);
    expect(isBoolean("1")).toBe(false);
    expect(isBoolean([])).toBe(false);
    expect(isBoolean({})).toBe(false);
  });
});
