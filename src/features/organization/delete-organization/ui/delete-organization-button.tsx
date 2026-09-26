"use client";
import { useState } from 'react';

import { X } from 'lucide-react';
import { toast } from 'sonner';

import { getApiErrorMessage } from '@/shared/api';
import { Button } from '@/shared/ui/kit';

import { useDeleteOrganizationMutation } from '../model';

type DeleteOrganizationButtonProps = {
  organizationId: string;
  canDelete: boolean;
};

export function DeleteOrganizationButton({
  organizationId,
  canDelete,
}: DeleteOrganizationButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const { mutate: deleteOrganization } = useDeleteOrganizationMutation();

  if (!canDelete) {
    return null;
  }

  const handleDelete = () => {
    setIsDeleting(true);

    deleteOrganization(organizationId, {
      onSettled: () => {
        setIsDeleting(false);
      },
      onSuccess: () => {
        toast.success("Организация успешно удалена");
      },
      onError: (error) => {
        toast.error(getApiErrorMessage(error));
      },
    });
  };

  return (
    <Button
      type="button"
      variant="danger"
      size="short"
      className="px-2 py-1"
      disabled={isDeleting}
      onClick={handleDelete}
    >
      <X size={20} />
    </Button>
  );
}
