import { afterEach, describe, expect, test, vi } from "vitest";
import { getRequest } from "@/index";

const mockData = { message: "This is mocking." };

describe("getRequest", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test("正常にデータを取得", async () => {
    vi.spyOn(global, "fetch").mockImplementation(async () => {
      return new Response(JSON.stringify(mockData), { status: 200 });
    });

    const response = await getRequest<typeof mockData>("https://api.localhost");
    expect(response.ok).toBe(true);
    expect(response.data).toEqual(mockData);
    expect(response.error).toBeUndefined();
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
    expect(response.error).toEqual(new Error("[400] Error"));
  });

  test("不明なエラーが返ってくる場合", async () => {
    vi.spyOn(global, "fetch").mockImplementation(() => {
      throw "not Error";
    });

    const response = await getRequest<typeof mockData>("https://api.localhost");
    expect(response.ok).toBe(false);
    expect(response.data).toBeUndefined();
    expect(response.error).toEqual(new Error("Unknown error"));
  });

  test("カスタムfetchとparserを利用する", async () => {
    const customFetcher = vi.fn(async (_url, init) => {
      expect(init?.method).toBe("POST");
      return new Response(JSON.stringify({ value: 1 }), { status: 200 });
    });

    const parser = vi.fn(async (response: Response) => {
      const body = await response.json() as { value: number };
      return body.value * 2;
    });

    const response = await getRequest<number>("https://api.localhost", {
      fetch: customFetcher,
      init: { method: "POST" },
      parser,
    });

    expect(customFetcher).toHaveBeenCalled();
    expect(parser).toHaveBeenCalled();
    expect(response).toEqual({ data: 2, ok: true });
  });

  test("fetchが存在しない環境ではエラーを返す", async () => {
    const originalFetch = global.fetch;
    // @ts-expect-error 故意に undefined を代入して挙動を確認する
    global.fetch = undefined;

    const response = await getRequest("https://api.localhost");
    expect(response.ok).toBe(false);
    expect(response.error).toEqual(
      new Error("Fetch API is not available in the current environment."),
    );

    global.fetch = originalFetch;
  });
});
