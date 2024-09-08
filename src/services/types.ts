export type FetchServerResponse<T, E = StandardError> = FetchOkResponse<T> | FetchError<E>;

export interface FetchOkResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export interface FetchError<T> {
  detail: T;
  status: number;
  statusText: string;
}

export interface StandardError {
  message: string;
  code: string;
}
