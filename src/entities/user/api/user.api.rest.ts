import { api } from '@/shared/api';
import {
  TUserResponseDTO,
  UserListResponse,
} from '@/shared/api/user';

export const userApi = {
  getById: async (id: string): Promise<TUserResponseDTO> => {
    const response = await api.get<TUserResponseDTO>(`/users/${id}`);

    return response.data;
  },

  getMany: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<UserListResponse> => {
    const response = await api.get<UserListResponse>("/users", {
      params,
    });

    return response.data;
  },
};
