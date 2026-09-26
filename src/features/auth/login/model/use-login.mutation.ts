"use client";

import { toast } from 'sonner';

import { getApiErrorMessage } from '@/shared/api';
import { authApi } from '@/shared/api/auth/api/rest/auth.api.rest';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,

    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["auth", "me"],
      });
      toast.success("Вы успешно вошли в аккаунт");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
};
