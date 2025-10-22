// src/utils/html-string-to-react.ts
import parse from "html-react-parser";
import * as React from "react";
var isScriptNode = (domNode) => {
  if ("type" in domNode && domNode.type === "script") {
    return true;
  }
  if ("name" in domNode && typeof domNode.name === "string") {
    return domNode.name.toLowerCase() === "script";
  }
  return false;
};
function htmlStringToReact(html) {
  return parse(html, {
    replace: (domNode) => {
      if (isScriptNode(domNode)) {
        return React.createElement(React.Fragment);
      }
      return void 0;
    }
  });
}
export {
  htmlStringToReact
};
//# sourceMappingURL=react.mjs.map