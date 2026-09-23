'use client';

import { organizationApi } from '@/entities/organization/api/organization.api';
import type {
  OrganizationCreate,
} from '@/shared/api/organization/dto/organization-create.dto';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export const useCreateOrganizationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: OrganizationCreate) =>
      organizationApi.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['organizations'],
      });
    },
  });
};