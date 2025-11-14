type RemovableValues = false | null | undefined;
/**
 * 配列から `undefined`・`null`・`false` を取り除き、残りの要素を返す。
 *
 * @param items - フィルタリング対象の配列
 * @returns falsy 値（`false`・`null`・`undefined`）を取り除いた新しい配列
 */
declare function arrayCleaning<T>(items: readonly T[]): Exclude<T, RemovableValues>[];

/**
 * 与えられた値を整数に変換する。変換できない場合はフォールバック値、もしくは `undefined` を返す。
 *
 * @param data - 数値化を試みる値
 * @param fallbackData - 変換に失敗した際に返すフォールバック値
 * @returns 変換後の数値、またはフォールバック値／`undefined`
 */
declare function castToNumber(data: unknown): number | undefined;
declare function castToNumber(data: unknown, fallbackData: number): number;

type ClassNameCandidate = string | false | null | undefined;
/**
 * クラス候補のリストをまとめて結合し、 falsy な要素を除去した文字列を返す。
 *
 * @param classes - クラス名または falsy を含む可変長引数
 * @returns スペース区切りで結合されたクラス名
 */
declare function mergeClasses(...classes: ClassNameCandidate[]): string;

type Fetcher = typeof fetch;
type ErrorResult = {
    code: string;
    message: string;
};
type RequestSuccess<T = unknown> = {
    ok: typeof RESPONSE_STATUS.success;
    data: T;
};
type RequestFailure = {
    ok: typeof RESPONSE_STATUS.failure;
    data?: never;
    error: ErrorResult;
};
type RequestResult<T = unknown> = RequestSuccess<T> | RequestFailure;
type RequestParser<T = unknown> = (response: Response) => Promise<T>;
declare const RESPONSE_STATUS: {
    readonly success: true;
    readonly failure: false;
};

type GetRequestOptions<T> = {
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
declare function getRequest<T = unknown>(url: string, options?: GetRequestOptions<T>): Promise<RequestResult<T>>;

type PostRequestOptions<T, B> = {
    fetch?: Fetcher;
    init?: Omit<RequestInit, "method" | "body" | "headers">;
    body?: B;
    headers?: HeadersInit;
    parser?: RequestParser<T>;
    serialize?: (body: B) => BodyInit | null | undefined;
    timeout?: number;
};
/**
 * `fetch` を用いた POST リクエストを発行し、レスポンスを取得する。
 * fetch 実装やパーサーを注入できるため、ブラウザ／Node 双方で柔軟に扱える。
 *
 * @param url - 送信先の URL
 * @param options - fetch 実装・リクエストオプション・レスポンスパーサーの指定
 * @returns 成功時は `ok: true` とデータ、失敗時は `ok: false` と `Error`
 */
declare function postRequest<T = unknown, B = unknown>(url: string, options?: PostRequestOptions<T, B>): Promise<RequestResult<T>>;

/**
 * HTML タグと代表的な実体参照を除去し、生テキストのみを取り出す。
 *
 * @param text - HTML を含む文字列
 * @returns タグと代表的なエンティティを取り除いた文字列
 */
declare function stripHtml(text: string): string;

/**
 * データが`boolean`型かチェックする。
 *
 * @param {unknown} data 渡されるデータ
 *
 * @return {boolean}
 */
declare function isBoolean(data: unknown): data is boolean;

/**
 * データが`number`型かチェックする。
 *
 * @param {unknown} data 渡されるデータ
 *
 * @return {boolean}
 */
declare function isNumber(data: unknown): data is number;

/**
 * データが`string`型かチェックする。
 *
 * @param {unknown} data 渡されるデータ
 *
 * @return {boolean}
 */
declare function isString(data: unknown): data is string;

/**
 * データが`undefined`型かチェックする。主に`number`型の`0`などの`falsy`なデータの未定義チェックを行いたい場合に使用する
 *
 * @param {unknown} data 渡されるデータ
 *
 * @return {boolean}
 */
declare function isUndefined(data: unknown): data is undefined;

export { type ClassNameCandidate, type ErrorResult, type Fetcher, type GetRequestOptions, type PostRequestOptions, RESPONSE_STATUS, type RemovableValues, type RequestFailure, type RequestParser, type RequestResult, type RequestSuccess, arrayCleaning, castToNumber, getRequest, isBoolean, isNumber, isString, isUndefined, mergeClasses, postRequest, stripHtml };
