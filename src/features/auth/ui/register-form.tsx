"use client";

import { Button } from '@/shared/ui/kit/button/button';
import { Input } from '@/shared/ui/kit/input/input';

import { useRegisterForm } from '../register/model/use-register-form';

type RegisterFormProps = {
  onLoginClick: () => void;
};

export function RegisterForm({ onLoginClick }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    onSubmit,
    formState: { errors },
    isPending,
  } = useRegisterForm();

  return (
    <>
      <h1 className="text-2xl font-semibold text-heading">Создание аккаунта</h1>

      <h2 className="mt-1 text-base text-text-muted">
        Создайте аккаунт, чтобы получить доступ ко всем возможностям
      </h2>

      <form
        id="register-form"
        onSubmit={handleSubmit(onSubmit)}
        className="my-6 grid grid-cols-1 gap-4 lg:grid-cols-2"
      >
        <div>
          <label htmlFor="register-email">Почта</label>

          <Input
            id="register-email"
            {...register("email")}
            placeholder="Введите почту"
            error={errors.email?.message}
          />
        </div>

        <div>
          <label htmlFor="register-phone">Телефон</label>

          <Input
            id="register-phone"
            type="tel"
            inputMode="numeric"
            placeholder="+79991234567"
            maxLength={12}
            {...register("phoneNumber")}
            error={errors.phoneNumber?.message}
          />
        </div>

        <div className="lg:col-span-2">
          <label htmlFor="register-password">Пароль</label>

          <Input
            id="register-password"
            type="password"
            {...register("password")}
            placeholder="Придумайте пароль"
            error={errors.password?.message}
          />
        </div>

        <div>
          <label htmlFor="register-family">Фамилия</label>

          <Input
            id="register-family"
            {...register("family")}
            placeholder="Введите фамилию"
            error={errors.family?.message}
          />
        </div>

        <div>
          <label htmlFor="register-name">Имя</label>

          <Input
            id="register-name"
            {...register("name")}
            placeholder="Введите имя"
            error={errors.name?.message}
          />
        </div>

        <div>
          <label htmlFor="register-patronymic">Отчество</label>

          <Input
            id="register-patronymic"
            {...register("patronymic")}
            placeholder="Введите отчество"
            error={errors.patronymic?.message}
          />
        </div>

        <div>
          <label htmlFor="register-birth-date">Дата рождения</label>

          <Input
            id="register-birth-date"
            type="date"
            {...register("birthDate")}
            error={errors.birthDate?.message}
          />
        </div>
      </form>

      <Button
        form="register-form"
        type="submit"
        loading={isPending}
        size="full"
      >
        Зарегистрироваться
      </Button>

      <div className="mt-4 flex items-center justify-center">
        <span>Есть аккаунт?</span>

        <Button
          type="button"
          variant="ghost"
          className="text-secondary"
          onClick={onLoginClick}
        >
          Войти
        </Button>
      </div>
    </>
  );
}
