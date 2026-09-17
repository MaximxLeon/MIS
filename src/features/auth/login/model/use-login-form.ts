"use client";

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { useLoginMutation } from '@/features/auth/login';
import {
  loginSchema,
  type TLoginDTO,
} from '@/shared/api/auth';
import { zodResolver } from '@hookform/resolvers/zod';

export function useLoginForm() {
  const router = useRouter();
  const loginMutation = useLoginMutation();

  const form = useForm<TLoginDTO>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: TLoginDTO) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        router.replace("/");
        router.refresh();
      },
    });
  };

  return {
    ...form,
    onSubmit,
    isPending: loginMutation.isPending,
    isError: loginMutation.isError,
    error: loginMutation.error,
  };
}
