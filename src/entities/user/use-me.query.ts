"use client";

import { useQuery } from "@tanstack/react-query";

import { authApi } from "@/shared/api/auth/auth.api";

export const useMeQuery = () => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: authApi.me,
    retry: false,
  });
};
