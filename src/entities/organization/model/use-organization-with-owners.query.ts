import { useQuery } from '@tanstack/react-query';

import { organizationGraphqlApi } from '../api';

type Options = {
  enabled?: boolean;
};

export function useOrganizationsWithOwnersQuery(
  options?: Options,
) {
  return useQuery({
    queryKey: ["organizations", "with-owners"],
    queryFn: organizationGraphqlApi.getAll,
    enabled: options?.enabled ?? true,
  });
}