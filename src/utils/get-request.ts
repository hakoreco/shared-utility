export type Fetcher = typeof fetch;
export type GetRequestSuccess<T> = {
  ok: true;
  data: T;
  error?: never;
};
export type GetRequestFailure = {
  ok: false;
  data?: never;
  error: Error;
};
export type GetRequestResult<T> = GetRequestSuccess<T> | GetRequestFailure;
export type GetRequestParser<T> = (response: Response) => Promise<T>;
export type GetRequestOptions<T> = {
  fetch?: Fetcher;
  init?: RequestInit;
  parser?: GetRequestParser<T>;
};

const defaultParser = async <T>(response: Response): Promise<T> => {
  return (await response.json()) as T;
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
): Promise<GetRequestResult<T>> {
  const { fetch: customFetch, init, parser = defaultParser<T> } = options;
  const fetcher: Fetcher | undefined = customFetch ?? globalThis.fetch;

  if (typeof fetcher !== "function") {
    return {
      error: new Error(
        "Fetch API is not available in the current environment.",
      ),
      ok: false,
    };
  }

  try {
    const response = await fetcher(url, init);

    if (!response.ok) {
      throw new Error(`[${response.status}] ${response.statusText}`);
    }

    return {
      data: await parser(response),
      ok: true,
    } satisfies GetRequestSuccess<T>;
  } catch (error) {
    return {
      error: error instanceof Error ? error : new Error("Unknown error"),
      ok: false,
    } satisfies GetRequestFailure;
  }
}
