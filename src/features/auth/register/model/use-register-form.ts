"use client";

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { useLoginMutation } from '@/features/auth/login/model';
import { useRegisterMutation } from '@/features/auth/register/model';
import {
  registerSchema,
  type TRegisterDTO,
} from '@/shared/api/auth/dto';
import { zodResolver } from '@hookform/resolvers/zod';

export function useRegisterForm() {
  const router = useRouter();

  const registerMutation = useRegisterMutation();
  const loginMutation = useLoginMutation();

  const form = useForm<TRegisterDTO>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: TRegisterDTO) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        loginMutation.mutate(
          {
            identifier: data.email,
            password: data.password,
          },
          {
            onSuccess: () => {
              router.replace("/");
              router.refresh();
            },
          },
        );
      },
    });
  };

  return {
    ...form,
    onSubmit,
    isPending: registerMutation.isPending || loginMutation.isPending,
  };
}
