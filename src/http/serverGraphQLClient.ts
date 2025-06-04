import 'server-only';
import { revalidateTag } from 'next/cache';

type GraphQLClientConfig = {
  query: string;
  variables?: Record<string, any>;
  headers?: Record<string, string>;
  tag?: string;
};

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';
const DEFAULT_TAG = 'github';

async function withRetry<T>(fn: () => Promise<T>, retries = 4, delayMs = 300): Promise<T> {
  let lastError: any;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < retries) {
        await new Promise((res) => setTimeout(res, delayMs));
      }
    }
  }

  throw lastError;
}

export default async function serverGraphQLClient<T>({
  query,
  variables = {},
  headers = {},
  tag = DEFAULT_TAG,
}: GraphQLClientConfig): Promise<T> {
  const fetchGraphQL = async () => {
    console.log('fez o fetch no graphql', tag);
    const res = await fetch(GITHUB_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify({ query, variables }),

      next: {
        tags: [tag],
        revalidate: 900,
      },
    });

    const data = await res.json();

    if (!res.ok || data.errors) {
      const message = data.errors?.[0]?.message ?? res.statusText;
      const error = new Error(message);
      (error as any).status = res.status;
      throw error;
    }

    return data.data as T;
  };

  const result = await withRetry(fetchGraphQL, 4, 400);

  return result;
}
