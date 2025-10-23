import { afterEach, describe, expect, test, vi } from "vitest";
import { getRequest, type RequestFailure } from "@/index";

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
