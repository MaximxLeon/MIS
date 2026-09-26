"use client";

import { organizationApi } from '@/entities/organization/api';
import type { OrganizationCreate } from '@/shared/api/organization/dto';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export const useCreateOrganizationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: OrganizationCreate) => organizationApi.create(data),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["organizations", "with-owners"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["organizations", "my"],
        }),
      ]);
    },
  });
};
