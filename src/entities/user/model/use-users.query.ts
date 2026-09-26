"use client";

import type { UserListQuery } from '@/shared/api/user/dto';
import { useQuery } from '@tanstack/react-query';

import { userApi } from '../api';

export const useUsersQuery = (query?: UserListQuery) => {
  return useQuery({
    queryKey: ["users", query],
    queryFn: () => userApi.getMany(query),
  });
};