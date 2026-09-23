"use client";

import { useState } from 'react';

import {
  useOrganizationsQuery,
} from '@/entities/organization/model/use-organizations.query';
import {
  CreateOrganizationForm,
} from '@/features/organization/create-organization/ui/create-organization-form';
import {
  Button,
  Dialog,
} from '@/shared/ui/kit';

export default function Organizations() {
  const [open, setOpen] = useState(false);

  const { data, isLoading, error } = useOrganizationsQuery();

  if (isLoading) {
    return (
      <main className="p-4">
        <h1 className="text-heading text-2xl font-bold">Организации</h1>

        <p className="mt-4 text-text-muted">Загрузка...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-4">
        <h1 className="text-heading text-2xl font-bold">Организации</h1>

        <p className="mt-4 text-red-500">Не удалось загрузить организации</p>
      </main>
    );
  }

  return (
    <main className="p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-heading text-2xl font-bold">Организации</h1>

        <Button type="button" onClick={() => setOpen(true)} size="short">
          Добавить организацию
        </Button>
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Создать организацию"
      >
        <CreateOrganizationForm onSuccess={() => setOpen(false)} />
      </Dialog>

      <div className="mt-4 flex flex-col gap-2">
        {data?.length === 0 && (
          <p className="text-text-muted">Список организаций пуст</p>
        )}

        {data?.map((organization) => (
          <div
            key={organization.id}
            className="rounded-lg border border-border-strong p-4"
          >
            <h2 className="font-semibold">{organization.name}</h2>

            {organization.shortName && (
              <p className="text-sm text-text-muted">
                {organization.shortName}
              </p>
            )}

            {organization.inn && (
              <p className="mt-2 text-sm">ИНН: {organization.inn}</p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
