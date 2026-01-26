/**
 * HTML タグと代表的な実体参照を除去し、生テキストのみを取り出す。
 *
 * @param text - HTML を含む文字列
 * @returns タグと代表的なエンティティを取り除いた文字列
 */
export function stripHTML(text: string): string {
  return text.replace(/(<([^>]+)>)/gi, "").replace(/&[a-z]+;/gi, "");
}
