import { api } from '@/shared/api';

import { UserListResponse } from '../';

export const userApi = {
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
