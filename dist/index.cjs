"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  arrayCleaning: () => arrayCleaning,
  castToNumber: () => castToNumber,
  getRequest: () => getRequest,
  isUndefined: () => isUndefined,
  mergeClasses: () => mergeClasses,
  stripHtml: () => stripHtml
});
module.exports = __toCommonJS(src_exports);

// src/utils/array-cleaning.ts
function arrayCleaning(items) {
  return items.filter((item) => {
    return item !== void 0 && item !== null && item !== false;
  });
}

// src/utils/cast-to-number.ts
function castToNumber(data, fallbackData) {
  if (typeof data === "number") {
    return data;
  }
  if (typeof data === "string") {
    const parsedData = Number.parseInt(data, 10);
    if (!Number.isNaN(parsedData)) {
      return parsedData;
    }
  }
  return fallbackData;
}

// src/utils/get-request.ts
var defaultParser = async (response) => {
  return await response.json();
};
async function getRequest(url, options = {}) {
  const { fetch: customFetch, init, parser = defaultParser } = options;
  const fetcher = customFetch ?? globalThis.fetch;
  if (typeof fetcher !== "function") {
    return {
      error: new Error(
        "Fetch API is not available in the current environment."
      ),
      ok: false
    };
  }
  try {
    const response = await fetcher(url, init);
    if (!response.ok) {
      throw new Error(`[${response.status}] ${response.statusText}`);
    }
    return {
      data: await parser(response),
      ok: true
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error : new Error("Unknown error"),
      ok: false
    };
  }
}

// src/utils/merge-classes.ts
function mergeClasses(...classes) {
  return arrayCleaning(classes).join(" ");
}

// src/utils/strip-html.ts
function stripHtml(text) {
  return text.replace(/(<([^>]+)>)/gi, "").replace(/&[a-z]+;/gi, "");
}

// src/utils/type-check/is-undefined.ts
function isUndefined(data) {
  return typeof data === "undefined";
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  arrayCleaning,
  castToNumber,
  getRequest,
  isUndefined,
  mergeClasses,
  stripHtml
});
//# sourceMappingURL=index.cjs.map