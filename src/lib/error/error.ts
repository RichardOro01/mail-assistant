import { FetchError, StandardError } from '@/services/types';

export const generalErrorCodes = ['unknown', 'network_error'];

export const isInstanceOfStandardError = (error: unknown): error is FetchError<StandardError> => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'detail' in error &&
    'status' in error &&
    'statusText' in error &&
    typeof error.detail === 'object' &&
    error.detail !== null &&
    'message' in error.detail &&
    'code' in error.detail
  );
};
