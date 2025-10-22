import { describe, expect, test } from "vitest";

import { stripHtml } from "@/index";

describe("stripHtml", () => {
  test("HTMLタグを含む文字列を渡す", () => {
    expect(stripHtml("<div>HTMLテキスト</div>")).toBe("HTMLテキスト");
    expect(stripHtml(`<img src="xxx" alt="">`)).toBe("");
    expect(stripHtml(`<img src="xxx" alt="" />`)).toBe("");
    expect(stripHtml("テキスト<span>HTML</span>テキスト")).toBe(
      "テキストHTMLテキスト",
    );
  });

  test("HTMLタグを含まない文字列を渡す", () => {
    expect(stripHtml("小さい < 大きい")).toBe("小さい < 大きい");
    expect(stripHtml("1 / 2")).toBe("1 / 2");
  });
});
