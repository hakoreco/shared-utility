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
export {
  arrayCleaning,
  castToNumber,
  getRequest,
  isUndefined,
  mergeClasses,
  stripHtml
};
//# sourceMappingURL=index.mjs.map