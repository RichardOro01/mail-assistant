import { FetchError, FetchOkResponse, StandardError } from './types';

export const fetcher = async <T, E = StandardError>(method: () => Promise<FetchOkResponse<T> | FetchError<E>>) => {
  const res = await method();
  return handleResponse<T, E>(res);
};

const handleResponse = <T, E>(res: FetchOkResponse<T> | FetchError<E>) => {
  if (res) {
    if (res.status >= 400) {
      return Promise.reject(res as FetchError<E>);
    }
    return Promise.resolve(res as FetchOkResponse<T>);
  }
  return Promise.reject();
};
