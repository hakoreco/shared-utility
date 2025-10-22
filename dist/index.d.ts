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

type Fetcher = typeof fetch;
type GetRequestSuccess<T> = {
    ok: true;
    data: T;
    error?: never;
};
type GetRequestFailure = {
    ok: false;
    data?: never;
    error: Error;
};
type GetRequestResult<T> = GetRequestSuccess<T> | GetRequestFailure;
type GetRequestParser<T> = (response: Response) => Promise<T>;
type GetRequestOptions<T> = {
    fetch?: Fetcher;
    init?: RequestInit;
    parser?: GetRequestParser<T>;
};
/**
 * `fetch` を用いた GET リクエストを発行し、JSON などのレスポンスを取得する。
 * fetch 実装やパーサーを注入できるため、ブラウザ／Node 双方で柔軟に扱える。
 *
 * @param url - 送信先の URL
 * @param options - fetch 実装・リクエストオプション・レスポンスパーサーの指定
 * @returns 成功時は `ok: true` とデータ、失敗時は `ok: false` と `Error`
 */
declare function getRequest<T = unknown>(url: string, options?: GetRequestOptions<T>): Promise<GetRequestResult<T>>;

type ClassNameCandidate = string | false | null | undefined;
/**
 * クラス候補のリストをまとめて結合し、 falsy な要素を除去した文字列を返す。
 *
 * @param classes - クラス名または falsy を含む可変長引数
 * @returns スペース区切りで結合されたクラス名
 */
declare function mergeClasses(...classes: ClassNameCandidate[]): string;

/**
 * HTML タグと代表的な実体参照を除去し、生テキストのみを取り出す。
 *
 * @param text - HTML を含む文字列
 * @returns タグと代表的なエンティティを取り除いた文字列
 */
declare function stripHtml(text: string): string;

/**
 * データが`undefined`型かチェックする。主に`number`型の`0`などの`falsy`なデータの未定義チェックを行いたい場合に使用する
 *
 * @param {unknown} data 渡されるデータ
 *
 * @return {boolean}
 */
declare function isUndefined(data: unknown): data is undefined;

export { type ClassNameCandidate, type Fetcher, type GetRequestFailure, type GetRequestOptions, type GetRequestParser, type GetRequestResult, type GetRequestSuccess, type RemovableValues, arrayCleaning, castToNumber, getRequest, isUndefined, mergeClasses, stripHtml };
