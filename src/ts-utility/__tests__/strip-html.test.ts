import { describe, expect, test } from "vitest";
import { stripHTML } from "@/ts-utility";

describe("stripHTML", () => {
  test("HTMLタグを含む文字列を渡す", () => {
    expect(stripHTML("<div>HTMLテキスト</div>")).toBe("HTMLテキスト");
    expect(stripHTML(`<img src="xxx" alt="">`)).toBe("");
    expect(stripHTML(`<img src="xxx" alt="" />`)).toBe("");
    expect(stripHTML("テキスト<span>HTML</span>テキスト")).toBe(
      "テキストHTMLテキスト",
    );
  });

  test("HTMLタグを含まない文字列を渡す", () => {
    expect(stripHTML("小さい < 大きい")).toBe("小さい < 大きい");
    expect(stripHTML("1 / 2")).toBe("1 / 2");
  });

  test("数値文字参照は除去しない", () => {
    expect(stripHTML("&#60;script&#62;")).toBe("&#60;script&#62;");
    expect(stripHTML("&#x3C;div&#x3E;")).toBe("&#x3C;div&#x3E;");
  });
});