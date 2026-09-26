"use client";

import { authApi } from '@/shared/api/auth/api/rest/auth.api.rest';
import { useQuery } from '@tanstack/react-query';

export const useMeQuery = () => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: authApi.me,
    retry: false,
  });
};
