import { weave } from '@gqloom/core';
import { asyncContextProvider } from '@gqloom/core/context';
import { ZodWeaver } from '@gqloom/zod';

import {
  organizationResolver,
} from '../resolver/organization/organization.resolver';

export const schema = weave(
  asyncContextProvider,
  ZodWeaver,
  organizationResolver,
);
