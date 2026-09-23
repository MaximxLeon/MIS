"use client";

import { userApi } from '@/shared/api/user/api/user.api';
import type { UserListQuery } from '@/shared/api/user/dto/user-list.query';
import { useQuery } from '@tanstack/react-query';

export const useUsersQuery = (query?: UserListQuery) => {
  return useQuery({
    queryKey: ["users", query],
    queryFn: () => userApi.getMany(query),
  });
};