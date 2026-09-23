import type { PaginatedResponse } from '../../dto';
import type { TUserResponseDTO } from './user.response';

export type UserListResponse = PaginatedResponse<TUserResponseDTO>;
