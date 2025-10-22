"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/react/index.ts
var react_exports = {};
__export(react_exports, {
  htmlStringToReact: () => htmlStringToReact
});
module.exports = __toCommonJS(react_exports);

// src/utils/html-string-to-react.ts
var import_html_react_parser = __toESM(require("html-react-parser"));
var React = __toESM(require("react"));
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
  return (0, import_html_react_parser.default)(html, {
    replace: (domNode) => {
      if (isScriptNode(domNode)) {
        return React.createElement(React.Fragment);
      }
      return void 0;
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  htmlStringToReact
});
//# sourceMappingURL=react.cjs.map