import { api } from '@/shared/api/axios';

import type { TAuthResponseDTO } from '../dto/auth.response';
import type { TLoginDTO } from '../dto/login.request';
import type { TRegisterDTO } from '../dto/register.request';

export const authApi = {
  async me() {
    const response = await api.get<TAuthResponseDTO>("/auth/me");

    return response.data;
  },

  async login(payload: TLoginDTO) {
    const response = await api.post<TAuthResponseDTO>("/auth/login", payload);

    return response.data;
  },

  async register(payload: TRegisterDTO) {
    const response = await api.post<TAuthResponseDTO>(
      "/auth/register",
      payload,
    );

    return response.data;
  },

  async logout() {
    await api.post("/auth/logout");
  },

  async logoutAll() {
    await api.post("/auth/logout-all");
  },
};
