export type Fetcher = typeof fetch;
export type ErrorResult = {
  code: string;
  message: string;
};

export type RequestSuccess<T = unknown> = {
  ok: typeof RESPONSE_STATUS.success;
  data: T;
};
export type RequestFailure = {
  ok: typeof RESPONSE_STATUS.failure;
  data?: never;
  error: ErrorResult;
};
export type RequestResult<T = unknown> = RequestSuccess<T> | RequestFailure;
export type RequestParser<T = unknown> = (response: Response) => Promise<T>;

export const RESPONSE_STATUS = {
  success: true,
  failure: false,
} as const;

export const defaultParser = async <T = unknown>(
  response: Response,
): Promise<T> => {
  return (await response.json()) as T;
};
export const generateRequestFailure = (
  code: string,
  message: string,
): RequestFailure => {
  return {
    error: {
      code: code,
      message: message,
    },
    ok: RESPONSE_STATUS.failure,
  };
};
