"use client";

import { useParams } from 'next/navigation';

import { useUserQuery } from '@/entities/user/model';

export default function UserPage() {
  const params = useParams<{ id: string }>();

  const { data, isLoading, error } = useUserQuery(params.id);

  if (isLoading) {
    return (
      <main className="p-4">
        <h1 className="text-heading text-2xl font-bold">
          Профиль пользователя
        </h1>

        <p className="mt-4 text-text-muted">Загрузка...</p>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="p-4">
        <h1 className="text-heading text-2xl font-bold">
          Профиль пользователя
        </h1>

        <p className="mt-4 text-red-500">Не удалось загрузить пользователя</p>
      </main>
    );
  }

  return (
    <main className="p-4">
      <h1 className="text-heading text-2xl font-bold">{data.fio}</h1>

      <div className="mt-6 flex flex-col gap-3">
        <p>
          <span className="font-medium">Email:</span> {data.email}
        </p>

        <p>
          <span className="font-medium">Телефон:</span> {data.phoneNumber}
        </p>

        {data.birthDate && (
          <p>
            <span className="font-medium">Дата рождения:</span>{" "}
            {new Date(data.birthDate).toLocaleDateString("ru-RU")}
          </p>
        )}
      </div>
    </main>
  );
}
