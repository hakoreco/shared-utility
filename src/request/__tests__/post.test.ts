import { afterEach, describe, expect, test, vi } from "vitest";
import { postRequest, type RequestFailure } from "@/index";

const mockData = { message: "This is mocking." };

describe("postRequest", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("文字列のボディをJSONとして送信してレスポンスを取得", async () => {
    const fetchMock = vi.fn(
      async (_url: RequestInfo | URL, init?: RequestInit) => {
        const headers = new Headers(init?.headers);

        expect(init?.method).toBe("POST");
        expect(init?.body).toBe('"payload"');
        expect(headers.get("Content-type")).toBe("application/json");

        return new Response(JSON.stringify(mockData), { status: 200 });
      },
    );

    const response = await postRequest<typeof mockData, string>(
      "https://api.localhost",
      {
        fetch: fetchMock,
        body: "payload",
      },
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response.ok).toBe(true);
    expect(response.data).toEqual(mockData);
  });

  test("fetchが失敗ステータスを返した場合にエラーを返す", async () => {
    const fetchMock = vi.fn(async () => {
      return new Response(null, { status: 500, statusText: "Server Error" });
    });

    const response = await postRequest("https://api.localhost", {
      fetch: fetchMock,
    });

    expect(response.ok).toBe(false);
    expect((response as RequestFailure).error).toEqual({
      code: "500",
      message: "Server Error",
    });
  });

  test("シリアライザ経由でボディを送信する", async () => {
    const serializer = vi.fn(() => {
      return "serialized-body";
    });
    const fetchMock = vi.fn(
      async (_url: RequestInfo | URL, init?: RequestInit) => {
        const headers = new Headers(init?.headers);

        expect(init?.method).toBe("POST");
        expect(init?.body).toBe("serialized-body");
        expect(headers.get("Content-type")).toBe(
          "application/json;charset=utf-8",
        );

        return new Response(JSON.stringify(mockData), { status: 200 });
      },
    );

    const response = await postRequest<typeof mockData, { foo: string }>(
      "https://api.localhost",
      {
        fetch: fetchMock,
        body: { foo: "bar" },
        headers: { "Content-type": "application/json;charset=utf-8" },
        serialize: serializer,
      },
    );

    expect(serializer).toHaveBeenCalledOnce();
    expect(serializer).toHaveBeenCalledWith({ foo: "bar" });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response.ok).toBe(true);
    expect(response.data).toEqual(mockData);
  });

  test("fetch実行時に例外が発生した場合にUNKNOWN_ERRORを返す", async () => {
    const fetchMock = vi.fn(async () => {
      throw new Error("Network error");
    });

    const response = await postRequest("https://api.localhost", {
      fetch: fetchMock,
    });

    expect(response.ok).toBe(false);
    expect((response as RequestFailure).error).toEqual({
      code: "UNKNOWN_ERROR",
      message: "Network error",
    });
  });

  test("POSTリクエストがタイムアウトした場合にエラーを返す（1）", async () => {
    vi.useFakeTimers();

    try {
      const fetchMock = vi.fn(
        async (_url: RequestInfo | URL, init?: RequestInit) => {
          expect(init?.signal).toBeInstanceOf(AbortSignal);

          return new Promise<Response>((_resolve, reject) => {
            init?.signal?.addEventListener("abort", () => {
              reject(new Error("Post request aborted by timeout"));
            });
          });
        },
      );

      const responsePromise = postRequest("https://api.localhost", {
        fetch: fetchMock,
        timeout: 1000,
      });

      await vi.advanceTimersByTimeAsync(1500);
      const response = await responsePromise;

      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(response.ok).toBe(false);
      expect((response as RequestFailure).error).toEqual({
        code: "UNKNOWN_ERROR",
        message: "Post request aborted by timeout",
      });
    } finally {
      vi.useRealTimers();
    }
  });

  test("POSTリクエストがタイムアウトした場合にエラーを返す（2）", async () => {
    vi.useFakeTimers();

    try {
      const fetchMock = vi.fn(
        async (_url: RequestInfo | URL, init?: RequestInit) => {
          expect(init?.signal).toBeInstanceOf(AbortSignal);

          return new Promise<Response>((_resolve, reject) => {
            init?.signal?.addEventListener("abort", () => {
              reject(new Error("Post request aborted by timeout"));
            });
          });
        },
      );

      const responsePromise = postRequest("https://api.localhost", {
        fetch: fetchMock,
        init: {
          signal: AbortSignal.timeout(1000),
        },
      });

      await vi.advanceTimersByTimeAsync(1500);
      const response = await responsePromise;

      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(response.ok).toBe(false);
      expect((response as RequestFailure).error).toEqual({
        code: "UNKNOWN_ERROR",
        message: "Post request aborted by timeout",
      });
    } finally {
      vi.useRealTimers();
    }
  });

  test("fetchが存在しない環境ではエラーを返す", async () => {
    const originalFetch = global.fetch;
    // @ts-expect-error テストのために fetch を未定義へ変更する
    global.fetch = undefined;

    const response = await postRequest("https://api.localhost");

    expect(response.ok).toBe(false);
    expect((response as RequestFailure).error).toEqual({
      code: "FETCH_API_ERROR",
      message: "Fetch API is not available in the current environment.",
    });

    global.fetch = originalFetch;
  });
});
