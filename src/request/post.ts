import {
  defaultParser,
  type Fetcher,
  generateRequestFailure,
  RESPONSE_STATUS,
  type RequestParser,
  type RequestResult,
  type RequestSuccess,
} from ".";

export type PostRequestOptions<T, B> = {
  fetch?: Fetcher;
  init?: Omit<RequestInit, "method" | "body" | "headers">;
  body?: B;
  headers?: HeadersInit;
  parser?: RequestParser<T>;
  serialize?: (body: B) => BodyInit | null | undefined;
  timeout?: number;
};

const isBodyInit = (body: unknown): body is BodyInit => {
  return (
    body instanceof Blob ||
    body instanceof FormData ||
    body instanceof URLSearchParams ||
    body instanceof ReadableStream ||
    body instanceof ArrayBuffer ||
    ArrayBuffer.isView(body)
  );
};

/**
 * `fetch` を用いた POST リクエストを発行し、レスポンスを取得する。
 * fetch 実装やパーサーを注入できるため、ブラウザ／Node 双方で柔軟に扱える。
 *
 * @param url - 送信先の URL
 * @param options - fetch 実装・リクエストオプション・レスポンスパーサーの指定
 * @returns 成功時は `ok: true` とデータ、失敗時は `ok: false` と `Error`
 */
export async function postRequest<T = unknown, B = unknown>(
  url: string,
  options: PostRequestOptions<T, B> = {},
): Promise<RequestResult<T>> {
  const {
    fetch: customFetch,
    init,
    body,
    headers,
    parser = defaultParser<T>,
    serialize,
    timeout = 3000,
  } = options;
  const fetcher: Fetcher | undefined = customFetch ?? globalThis.fetch;

  if (typeof fetcher !== "function") {
    return generateRequestFailure(
      "FETCH_API_ERROR",
      "Fetch API is not available in the current environment.",
    );
  }

  try {
    let payload: BodyInit | null | undefined;
    if (serialize) {
      if (body) {
        payload = serialize(body);
      }
    } else if (isBodyInit(body)) {
      payload = body;
    } else if (typeof body === "string") {
      payload = JSON.stringify(body);
    }

    const baseHeaders = new Headers(headers);
    if (typeof body === "string" && !baseHeaders.has("Content-type")) {
      baseHeaders.set("Content-type", "application/json");
    }

    const response = await fetcher(url, {
      signal: AbortSignal.timeout(timeout),
      ...init,
      body: payload ?? null,
      headers: baseHeaders,
      method: "POST",
    });

    if (!response.ok) {
      return generateRequestFailure(
        response.status.toString(),
        response.statusText,
      );
    }

    return {
      data: await parser(response),
      ok: RESPONSE_STATUS.success,
    } satisfies RequestSuccess<T>;
  } catch (error) {
    if (error instanceof Error) {
      return generateRequestFailure("UNKNOWN_ERROR", error.message);
    }

    return generateRequestFailure("UNKNOWN_ERROR", "Unknown error.");
  }
}
