import { api } from '@/shared/api';
import {
  OrganizationCreate,
  OrganizationResponse,
} from '@/shared/api/organization';

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
};
