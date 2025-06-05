import { AxiosError } from 'axios';

import { errorList } from '@/constants';

interface ApiErrorResponse {
  message?: string;
}

export function handleApiError(error: unknown): never {
  const _error = error as AxiosError<ApiErrorResponse>;
  if (_error.response) {
    const { status, data } = _error.response;
    const errorEntry = errorList.find((e) => e.statusCode === status);
    if (errorEntry) {
      throw new Error(data?.message || errorEntry.message);
    }
  }
  throw new Error('Um erro inesperado aconteceu');
}
