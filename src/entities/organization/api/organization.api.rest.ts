import { api } from '@/shared/api';
import type {
  OrganizationCreate,
  OrganizationResponse,
} from '@/shared/api/organization/dto';

export const organizationApi = {
  getAll: async (): Promise<OrganizationResponse[]> => {
    const response = await api.get<OrganizationResponse[]>("/organizations");

    return response.data;
  },

  create: async (data: OrganizationCreate): Promise<OrganizationResponse> => {
    const response = await api.post<OrganizationResponse>(
      "/organizations",
      data,
    );

    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/organizations/${id}`);
  },
};
