import { afterEach, describe, expect, test, vi } from "vitest";
import { getRequest, type RequestFailure } from "@/ts-utility";

const mockData = { message: "This is mocking." };

describe("getRequest", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("正常にデータを取得", async () => {
    vi.spyOn(global, "fetch").mockImplementation(async () => {
      return new Response(JSON.stringify(mockData), { status: 200 });
    });

    const response = await getRequest<typeof mockData>("https://api.localhost");
    expect(response.ok).toBe(true);
    expect(response.data).toEqual(mockData);
  });

  test("データの取得に失敗", async () => {
    vi.spyOn(global, "fetch").mockImplementation(async () => {
      return new Response(JSON.stringify(mockData), {
        status: 400,
        statusText: "Error",
      });
    });

    const response = await getRequest<typeof mockData>("https://api.localhost");
    expect(response.ok).toBe(false);
    expect(response.data).toBeUndefined();
    expect((response as RequestFailure).error).toEqual({
      code: "400",
      message: "Error",
    });
  });

  test("不明なエラーが返ってくる場合", async () => {
    vi.spyOn(global, "fetch").mockImplementation(() => {
      throw "not Error";
    });

    const response = await getRequest<typeof mockData>("https://api.localhost");
    expect(response.ok).toBe(false);
    expect(response.data).toBeUndefined();
    expect((response as RequestFailure).error).toEqual({
      code: "UNKNOWN_ERROR",
      message: "Unknown error.",
    });
  });

  test("指定したタイムアウトでリクエストが中断される（1）", async () => {
    vi.useFakeTimers();

    try {
      const fetchMock = vi.fn(
        async (_url: RequestInfo | URL, init?: RequestInit) => {
          expect(init?.signal).toBeInstanceOf(AbortSignal);

          return new Promise<Response>((_resolve, reject) => {
            init?.signal?.addEventListener("abort", () => {
              const error = new Error("Request aborted by timeout");
              error.name = "AbortError";
              reject(error);
            });
          });
        },
      );

      const responsePromise = getRequest("https://api.localhost", {
        fetch: fetchMock,
        timeout: 1000,
      });

      await vi.advanceTimersByTimeAsync(1500);
      const response = await responsePromise;

      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(response.ok).toBe(false);
      expect((response as RequestFailure).error).toEqual({
        code: "UNKNOWN_ERROR",
        message: "Request aborted by timeout",
      });
    } finally {
      vi.useRealTimers();
    }
  });

  test("指定したタイムアウトでリクエストが中断される（2）", async () => {
    vi.useFakeTimers();

    try {
      const fetchMock = vi.fn(
        async (_url: RequestInfo | URL, init?: RequestInit) => {
          expect(init?.signal).toBeInstanceOf(AbortSignal);

          return new Promise<Response>((_resolve, reject) => {
            init?.signal?.addEventListener("abort", () => {
              const error = new Error("Request aborted by timeout");
              error.name = "AbortError";
              reject(error);
            });
          });
        },
      );

      const responsePromise = getRequest("https://api.localhost", {
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
        message: "Request aborted by timeout",
      });
    } finally {
      vi.useRealTimers();
    }
  });

  test("fetchが存在しない環境ではエラーを返す", async () => {
    const originalFetch = global.fetch;
    // @ts-expect-error 故意に undefined を代入して挙動を確認する
    global.fetch = undefined;

    const response = await getRequest("https://api.localhost");
    expect(response.ok).toBe(false);
    expect((response as RequestFailure).error).toEqual({
      code: "FETCH_API_ERROR",
      message: "Fetch API is not available in the current environment.",
    });

    global.fetch = originalFetch;
  });
});
