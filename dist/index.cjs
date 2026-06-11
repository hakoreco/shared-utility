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

// src/ts-utility/index.ts
var ts_utility_exports = {};
__export(ts_utility_exports, {
  RESPONSE_STATUS: () => RESPONSE_STATUS,
  arrayCleaning: () => arrayCleaning,
  castToNumber: () => castToNumber,
  getRequest: () => getRequest,
  isBoolean: () => isBoolean,
  isNumber: () => isNumber,
  isString: () => isString,
  isUndefined: () => isUndefined,
  mergeClasses: () => mergeClasses,
  postRequest: () => postRequest,
  stripHTML: () => stripHTML
});
module.exports = __toCommonJS(ts_utility_exports);

// src/ts-utility/array-cleaning.ts
function arrayCleaning(items) {
  return items.filter((item) => {
    return item !== void 0 && item !== null && item !== false;
  });
}

// src/ts-utility/cast-to-number.ts
function castToNumber(data, fallbackData) {
  if (typeof data === "number") {
    return data;
  }
  if (typeof data === "string") {
    const parsedData = Number.parseFloat(data);
    if (!Number.isNaN(parsedData)) {
      return parsedData;
    }
  }
  return fallbackData;
}

// src/ts-utility/merge-classes.ts
function mergeClasses(...classes) {
  return arrayCleaning(classes).join(" ");
}

// src/ts-utility/request/index.ts
var RESPONSE_STATUS = {
  success: true,
  failure: false
};
var defaultParser = async (response) => {
  return await response.json();
};
var generateRequestFailure = (code, message) => {
  return {
    error: {
      code,
      message
    },
    ok: RESPONSE_STATUS.failure
  };
};

// src/ts-utility/request/get.ts
async function getRequest(url, options = {}) {
  const {
    fetch: customFetch,
    init,
    parser = defaultParser,
    timeout = 3e3
  } = options;
  const fetcher = customFetch ?? globalThis.fetch;
  if (typeof fetcher !== "function") {
    return generateRequestFailure(
      "FETCH_API_ERROR",
      "Fetch API is not available in the current environment."
    );
  }
  try {
    const signals = [AbortSignal.timeout(timeout)];
    if (init?.signal instanceof AbortSignal) {
      signals.push(init.signal);
    }
    const response = await fetcher(url, {
      ...init,
      signal: AbortSignal.any(signals),
      method: "GET"
    });
    if (!response.ok) {
      return generateRequestFailure(
        response.status.toString(),
        response.statusText || `Request failed with status ${response.status}`
      );
    }
    return {
      data: await parser(response),
      ok: RESPONSE_STATUS.success
    };
  } catch (error) {
    if (error instanceof Error && "digest" in error) {
      throw error;
    }
    if (error instanceof Error) {
      return generateRequestFailure("UNKNOWN_ERROR", error.message);
    }
    return generateRequestFailure("UNKNOWN_ERROR", "Unknown error.");
  }
}

// src/ts-utility/request/post.ts
var isBodyInit = (body) => {
  return body instanceof Blob || body instanceof FormData || body instanceof URLSearchParams || body instanceof ReadableStream || body instanceof ArrayBuffer || ArrayBuffer.isView(body);
};
async function postRequest(url, options = {}) {
  const {
    fetch: customFetch,
    init,
    body,
    headers,
    parser = defaultParser,
    serialize,
    timeout = 3e3
  } = options;
  const fetcher = customFetch ?? globalThis.fetch;
  if (typeof fetcher !== "function") {
    return generateRequestFailure(
      "FETCH_API_ERROR",
      "Fetch API is not available in the current environment."
    );
  }
  try {
    let payload;
    if (serialize) {
      if (body != null) {
        payload = serialize(body);
      }
    } else if (isBodyInit(body)) {
      payload = body;
    } else if (body != null) {
      payload = JSON.stringify(body);
    }
    const baseHeaders = new Headers(headers);
    if (!serialize && !isBodyInit(body) && body != null && !baseHeaders.has("Content-Type")) {
      baseHeaders.set("Content-Type", "application/json");
    }
    const signals = [AbortSignal.timeout(timeout)];
    if (init?.signal instanceof AbortSignal) {
      signals.push(init.signal);
    }
    const response = await fetcher(url, {
      ...init,
      signal: AbortSignal.any(signals),
      body: payload ?? null,
      headers: baseHeaders,
      method: "POST"
    });
    if (!response.ok) {
      return generateRequestFailure(
        response.status.toString(),
        response.statusText || `Request failed with status ${response.status}`
      );
    }
    return {
      data: await parser(response),
      ok: RESPONSE_STATUS.success
    };
  } catch (error) {
    if (error instanceof Error && "digest" in error) {
      throw error;
    }
    if (error instanceof Error) {
      return generateRequestFailure("UNKNOWN_ERROR", error.message);
    }
    return generateRequestFailure("UNKNOWN_ERROR", "Unknown error.");
  }
}

// src/ts-utility/strip-html.ts
function stripHTML(text) {
  return text.replace(/(<([^>]+)>)/gi, "").replace(/&[a-z]+;/gi, "");
}

// src/ts-utility/type-check/is-boolean.ts
function isBoolean(data) {
  return typeof data === "boolean";
}

// src/ts-utility/type-check/is-number.ts
function isNumber(data) {
  return typeof data === "number";
}

// src/ts-utility/type-check/is-string.ts
function isString(data) {
  return typeof data === "string";
}

// src/ts-utility/type-check/is-undefined.ts
function isUndefined(data) {
  return typeof data === "undefined";
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RESPONSE_STATUS,
  arrayCleaning,
  castToNumber,
  getRequest,
  isBoolean,
  isNumber,
  isString,
  isUndefined,
  mergeClasses,
  postRequest,
  stripHTML
});
//# sourceMappingURL=index.cjs.map