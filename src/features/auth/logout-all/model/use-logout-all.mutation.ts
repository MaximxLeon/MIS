"use client";

import { toast } from 'sonner';

import { authApi } from '@/shared/api/auth/api/auth.api';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export const useLogoutAllMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logoutAll,

    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["auth", "me"],
      });
      toast.info("Вы вышли с аккаунта!");
    },
  });
};
