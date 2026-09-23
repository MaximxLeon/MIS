import type { PaginationResponse } from './pagination.response';

export type PaginatedResponse<T> = {
  items: T[];
  pagination: PaginationResponse;
};
