"use client";

import { useQuery } from '@tanstack/react-query';

import { userApi } from '../api/';

export function useUserQuery(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => userApi.getById(id),
    enabled: Boolean(id),
  });
}
