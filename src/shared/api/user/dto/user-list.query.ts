import { z } from 'zod';

import {
  PaginationQueryDTO,
  SearchQueryDTO,
} from '../../dto';

export const UserListQueryDTO = PaginationQueryDTO.extend(SearchQueryDTO.shape);

export type UserListQuery = {
  page?: number;
  limit?: number;
  search?: string;
};

export type ParsedUserListQuery = z.infer<typeof UserListQueryDTO>;
