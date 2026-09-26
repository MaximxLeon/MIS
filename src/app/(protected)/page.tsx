"use client";

import { useForm } from 'react-hook-form';

import { useMeQuery } from '@/entities/user/model';
import { useLoginMutation } from '@/features/auth/login/model';
import { useLogoutAllMutation } from '@/features/auth/logout-all/model';
import { useLogoutMutation } from '@/features/auth/logout/model';
import { getApiErrorMessage } from '@/shared/api';
import {
  loginSchema,
  type TLoginDTO,
} from '@/shared/api/auth/dto';
import { formatDate } from '@/shared/lib';
import { Button } from '@/shared/ui/kit/button/Button';
import { Input } from '@/shared/ui/kit/input/Input';
import { zodResolver } from '@hookform/resolvers/zod';

export default function LoginTestPage() {
  const loginMutation = useLoginMutation();
  const logoutMutation = useLogoutMutation();
  const logoutAllMutation = useLogoutAllMutation();
  const meQuery = useMeQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginDTO>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: TLoginDTO) => {
    loginMutation.mutate(data);
  };

  if (meQuery.isLoading) {
    return <main>Проверка авторизации...</main>;
  }

  const user = meQuery.data?.user;

  if (!user) {
    return (
      <main>
        <h1>Вы не авторизованы</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 p-4"
        >
          <Input
            {...register("identifier")}
            placeholder="Введите почту или телефон"
            error={errors.identifier?.message}
          />

          <Input
            type="password"
            {...register("password")}
            error={errors.password?.message}
          />

          <div>
            <Button type="submit" loading={loginMutation.isPending}>
              Войти
            </Button>
          </div>
        </form>

        {loginMutation.isError && (
          <p> {getApiErrorMessage(loginMutation.error)}</p>
        )}

        {loginMutation.isSuccess && <p>Успешный вход</p>}
      </main>
    );
  }

  return (
    <main>
      <h1>Вы авторизованы</h1>

      <p>
        <strong>ФИО:</strong> {user.fio}
      </p>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Телефон:</strong> {user.phoneNumber}
      </p>

      <p>
        <strong>Дата рождения:</strong> {formatDate(user.birthDate)}
      </p>

      <hr />

      <div className="flex flex-row gap-4">
        <Button
          type="button"
          onClick={() => logoutMutation.mutate()}
          loading={logoutMutation.isPending}
          size="short"
        >
          Выйти
        </Button>

        <Button
          type="button"
          onClick={() => logoutAllMutation.mutate()}
          loading={logoutAllMutation.isPending}
          size="short"
        >
          Выйти со всех устройств
        </Button>
      </div>

      {logoutMutation.isError && <p>Ошибка выхода</p>}

      {logoutAllMutation.isError && <p>Ошибка выхода со всех устройств</p>}
    </main>
  );
}
