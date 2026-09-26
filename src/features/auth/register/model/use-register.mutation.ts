"use client";

import { toast } from 'sonner';

import { authApi } from '@/shared/api/auth/api/rest/auth.api.rest';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.register,

    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["auth", "me"],
      });
      toast.success("Вы успешно создали аккаунт");
    },
  });
};
