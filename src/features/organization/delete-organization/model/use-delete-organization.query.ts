import { organizationApi } from '@/entities/organization/api';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export function useDeleteOrganizationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => organizationApi.delete(id),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["organizations", "with-owners"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["organizations", "my"],
        }),
      ]);
    },
  });
}
