import axios from 'axios';
import { print } from 'graphql';

import type { TypedDocumentNode } from '@graphql-typed-document-node/core';

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{
    message: string;
  }>;
};

export async function graphqlRequest<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables: TVariables,
): Promise<TResult> {
  const response = await axios.post<GraphQLResponse<TResult>>(
    "/api/graphql",
    {
      query: print(document),
      variables,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (response.data.errors?.length) {
    throw new Error(response.data.errors[0].message);
  }

  if (!response.data.data) {
    throw new Error("GraphQL response does not contain data");
  }

  return response.data.data;
}