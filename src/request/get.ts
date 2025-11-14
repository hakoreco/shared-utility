import {
  defaultParser,
  type Fetcher,
  generateRequestFailure,
  RESPONSE_STATUS,
  type RequestParser,
  type RequestResult,
  type RequestSuccess,
} from ".";

export type GetRequestOptions<T> = {
  fetch?: Fetcher;
  init?: Omit<RequestInit, "method">;
  parser?: RequestParser<T>;
  timeout?: number;
};

/**
 * `fetch` を用いた GET リクエストを発行し、JSON などのレスポンスを取得する。
 * fetch 実装やパーサーを注入できるため、ブラウザ／Node 双方で柔軟に扱える。
 *
 * @param url - 送信先の URL
 * @param options - fetch 実装・リクエストオプション・レスポンスパーサーの指定
 * @returns 成功時は `ok: true` とデータ、失敗時は `ok: false` と `Error`
 */
export async function getRequest<T = unknown>(
  url: string,
  options: GetRequestOptions<T> = {},
): Promise<RequestResult<T>> {
  const {
    fetch: customFetch,
    init,
    parser = defaultParser<T>,
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
    const response = await fetcher(url, {
      signal: AbortSignal.timeout(timeout),
      ...init,
      method: "GET",
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
