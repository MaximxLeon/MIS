import axios from 'axios';

export const graphqlClient = axios.create({
  baseURL: "/api/graphql",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const { data } = await graphqlClient.post<{
    data?: T;
    errors?: Array<{
      message: string;
    }>;
  }>("", {
    query,
    variables,
  });

  if (data.errors?.length) {
    throw new Error(data.errors[0].message);
  }

  if (!data.data) {
    throw new Error("GraphQL response does not contain data");
  }

  return data.data;
}