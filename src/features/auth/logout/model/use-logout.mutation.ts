"use client";
import { toast } from 'sonner';

import { authApi } from '@/shared/api/auth/api/auth.api';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,

    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["auth", "me"],
      });
      toast.info("Вы вышли с аккаунта!");
    },
  });
};
