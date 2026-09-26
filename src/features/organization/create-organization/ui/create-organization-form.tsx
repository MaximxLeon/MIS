"use client";

import {
  Controller,
  useForm,
} from 'react-hook-form';
import { toast } from 'sonner';

import { UserMultiSelect } from '@/entities/user/ui';
import { getApiErrorMessage } from '@/shared/api';
import {
  type OrganizationCreate,
  OrganizationCreateDTO,
} from '@/shared/api/organization/dto';
import {
  Button,
  Input,
} from '@/shared/ui/kit';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  useCreateOrganizationMutation,
} from '../model/use-create-organization.mutation';

type CreateOrganizationFormProps = {
  onSuccess: () => void;
};

export function CreateOrganizationForm({
  onSuccess,
}: CreateOrganizationFormProps) {
  const mutation = useCreateOrganizationMutation();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OrganizationCreate>({
    resolver: zodResolver(OrganizationCreateDTO),
    defaultValues: {
      name: "",
      shortName: "",
      inn: "",
      kpp: "",
      ogrn: "",
      legalAddress: "",
      phone: "",
      email: "",
      website: "",
      ownerIds: [],
    },
  });

  const onSubmit = (data: OrganizationCreate) => {
    mutation.mutate(data, {
      onError: (error) => {
        toast.error(getApiErrorMessage(error));
      },
      onSuccess: () => {
        toast.success("Организация успешно создана");
        onSuccess();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Input
            label="Название"
            placeholder="Введите название организации"
            error={errors.name?.message}
            {...register("name")}
          />
        </div>

        <Input
          label="Краткое название"
          placeholder="Введите краткое название"
          error={errors.shortName?.message}
          {...register("shortName")}
        />

        <Input
          label="ИНН"
          placeholder="Введите ИНН"
          error={errors.inn?.message}
          {...register("inn")}
        />

        <Input
          label="КПП"
          placeholder="Введите КПП"
          error={errors.kpp?.message}
          {...register("kpp")}
        />

        <Input
          label="ОГРН"
          placeholder="Введите ОГРН"
          error={errors.ogrn?.message}
          {...register("ogrn")}
        />

        <div className="sm:col-span-2">
          <Input
            label="Юридический адрес"
            placeholder="Введите юридический адрес"
            error={errors.legalAddress?.message}
            {...register("legalAddress")}
          />
        </div>

        <Input
          label="Телефон"
          placeholder="+7 (999) 000-00-00"
          error={errors.phone?.message}
          {...register("phone")}
        />

        <Input
          label="Email"
          type="email"
          placeholder="organization@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <div className="sm:col-span-2">
          <Input
            label="Сайт"
            placeholder="https://example.com"
            error={errors.website?.message}
            {...register("website")}
          />
        </div>

        <div className="sm:col-span-2">
          <Controller
            name="ownerIds"
            control={control}
            render={({ field }) => (
              <UserMultiSelect
                label="Владельцы"
                placeholder="Поиск владельцев"
                value={field.value ?? []}
                onChange={field.onChange}
                error={errors.ownerIds?.message}
              />
            )}
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit" loading={mutation.isPending}>
          Создать
        </Button>
      </div>
    </form>
  );
}
