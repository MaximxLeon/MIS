import 'server-only';

import { requireSession } from '@/server/auth';

export async function createGraphQLContext() {
  try {
    const session = await requireSession();

    return {
      userId: session.userId,
    };
  } catch {
    return {
      userId: null,
    };
  }
}

export type GraphQLContext = Awaited<ReturnType<typeof createGraphQLContext>>;
