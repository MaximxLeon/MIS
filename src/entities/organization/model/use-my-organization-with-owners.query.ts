import { useQuery } from '@tanstack/react-query';

import { organizationGraphqlApi } from '../api';

type Options = {
  enabled?: boolean;
};

export function useMyOrganizationsQuery(options?: Options) {
  return useQuery({
    queryKey: ["organizations", "my"],
    queryFn: organizationGraphqlApi.getByOwn,
    enabled: options?.enabled ?? true,
  });
}
