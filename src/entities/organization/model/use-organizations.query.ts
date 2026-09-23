"use client";

import { useQuery } from '@tanstack/react-query';

import { organizationApi } from '../api/organization.api';

export const useOrganizationsQuery = () => {
  return useQuery({
    queryKey: ["organizations"],
    queryFn: organizationApi.getAll,
  });
};