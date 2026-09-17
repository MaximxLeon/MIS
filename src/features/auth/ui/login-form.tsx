"use client";

import { Button } from '@/shared/ui/kit/button/button';
import { Input } from '@/shared/ui/kit/input/input';

import { useLoginForm } from '../login/model/use-login-form';

type LoginFormProps = {
  onRegisterClick: () => void;
};

export function LoginForm({ onRegisterClick }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    onSubmit,
    formState: { errors },
    isPending,
  } = useLoginForm();

  return (
    <>
      <h1 className="text-2xl font-semibold text-heading">Вход в аккаунт</h1>

      <h2 className="mt-1 text-base text-text-muted">
        Добро пожаловать! Войдите в свой аккаунт
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-6 flex flex-col gap-4"
      >
        <Input
          label="Логин"
          {...register("identifier")}
          placeholder="Введите почту или телефон"
          error={errors.identifier?.message}
        />

        <Input
          label="Пароль"
          type="password"
          {...register("password")}
          placeholder="Введите пароль"
          error={errors.password?.message}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Запомнить меня
          </label>

          <Button type="button" variant="link" className="text-secondary">
            Забыли пароль?
          </Button>
        </div>

        <Button type="submit" loading={isPending} size="full">
          Войти
        </Button>
      </form>

      <div className="flex items-center justify-center">
        <span>Нет аккаунта?</span>

        <Button
          type="button"
          variant="ghost"
          className="text-secondary"
          onClick={onRegisterClick}
        >
          Зарегистрироваться
        </Button>
      </div>
    </>
  );
}
