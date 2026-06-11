import type { DOMNode } from "html-react-parser";
import parse from "html-react-parser";
import * as React from "react";

export type HTMLStringToReactResult = ReturnType<typeof parse>;

// html-react-parser のノード型は複数あり、要素種別のプロパティ名が異なる。
// Text 系は `type`、Element 系は `name` にタグ名が入るため両方チェックする必要がある。
const isScriptNode = (domNode: DOMNode): boolean => {
  if ("type" in domNode && domNode.type === "script") {
    return true;
  }

  if ("name" in domNode && typeof domNode.name === "string") {
    return domNode.name.toLowerCase() === "script";
  }

  return false;
};

/**
 * HTML 文字列を React ノードに変換し、`script` タグを除去する。
 *
 * @param html - 変換対象の HTML 文字列
 * @returns React 要素、文字列、もしくは空配列
 */
export function htmlStringToReact(html: string): HTMLStringToReactResult {
  return parse(html, {
    replace: (domNode) => {
      if (isScriptNode(domNode)) {
        return React.createElement(React.Fragment);
      }

      return undefined;
    },
  });
}