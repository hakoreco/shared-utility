import parse from 'html-react-parser';

type HtmlStringToReactResult = ReturnType<typeof parse>;
/**
 * HTML 文字列を React ノードに変換し、`script` タグを除去する。
 *
 * @param html - 変換対象の HTML 文字列
 * @returns React 要素、文字列、もしくは空配列
 */
declare function htmlStringToReact(html: string): HtmlStringToReactResult;

export { type HtmlStringToReactResult, htmlStringToReact };
