import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { htmlStringToReact } from "@/react";

describe("htmlStringToReact", () => {
  test("空文字列を処理できる", () => {
    const result = htmlStringToReact("");
    expect(result).toEqual([]);
  });

  test("単純なテキストを処理できる", () => {
    const result = htmlStringToReact("Hello World");
    expect(result).toBe("Hello World");
  });

  test("基本的なHTMLタグを処理できる", () => {
    const result = htmlStringToReact("<p>Hello World</p>");
    const { container } = render(result);
    expect(container.innerHTML).toBe("<p>Hello World</p>");
  });

  test("複数のHTML要素を処理できる", () => {
    const html = "<h1>Title</h1><p>Paragraph</p>";
    const result = htmlStringToReact(html);
    const { container } = render(result);
    expect(container.innerHTML).toBe("<h1>Title</h1><p>Paragraph</p>");
  });

  test("ネストしたHTML要素を処理できる", () => {
    const html = "<div><span>Nested content</span></div>";
    const result = htmlStringToReact(html);
    const { container } = render(result);
    expect(container.innerHTML).toBe("<div><span>Nested content</span></div>");
  });

  test("HTML属性を正しく処理できる", () => {
    const html = '<div class="test-class" id="test-id">Content</div>';
    const result = htmlStringToReact(html);
    const { container } = render(result);
    expect(container.innerHTML).toBe(
      '<div class="test-class" id="test-id">Content</div>',
    );
  });

  test("scriptタグをFragmentに置き換える", () => {
    const html = '<div>Before<script>alert("xss")</script>After</div>';
    const result = htmlStringToReact(html);
    const { container } = render(result);
    // scriptタグは削除されて、前後のテキストのみが残る
    expect(container.innerHTML).toBe("<div>BeforeAfter</div>");
  });

  test("複数のscriptタグを処理できる", () => {
    const html = `
      <div>
        <script>console.log("first")</script>
        <p>Content</p>
        <script>console.log("second")</script>
      </div>
    `;
    const result = htmlStringToReact(html);
    const { container } = render(result);

    // scriptタグが削除されていることを確認
    expect(container.innerHTML).not.toContain("<script>");
    expect(container.innerHTML).toContain("<p>Content</p>");
  });

  test("自己完結型のHTMLタグを処理できる", () => {
    const html = '<img src="test.jpg" alt="test" /><br />';
    const result = htmlStringToReact(html);
    const { container } = render(result);
    expect(container.innerHTML).toBe('<img alt="test" src="test.jpg"><br>');
  });

  test("不正なHTMLでもエラーを投げない", () => {
    const html = "<div><p>Unclosed paragraph</div>";
    expect(() => {
      return htmlStringToReact(html);
    }).not.toThrow();
  });

  test("特殊文字を含むHTMLを処理できる", () => {
    const html = "<p>&lt;script&gt;alert('xss')&lt;/script&gt;</p>";
    const result = htmlStringToReact(html);
    const { container } = render(result);
    expect(container.innerHTML).toBe(
      "<p>&lt;script&gt;alert('xss')&lt;/script&gt;</p>",
    );
  });

  test("大きなHTMLドキュメントを処理できる", () => {
    const html = Array.from({ length: 100 }, (_, i) => {
      return `<p>Paragraph ${i}</p>`;
    }).join("");
    expect(() => {
      return htmlStringToReact(html);
    }).not.toThrow();
  });
});
