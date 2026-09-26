import { createYoga } from 'graphql-yoga';

import { createGraphQLContext } from '@/server/graphql/context';
import { schema } from '@/server/graphql/schema';

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  context: createGraphQLContext,
});

export const GET = yoga;
export const POST = yoga;
