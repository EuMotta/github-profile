import 'server-only';
import { revalidateTag } from 'next/cache';

import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

type MutatorConfig = {
  url: string;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  body?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
};

const API_URL = process.env.API_URL!;

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

export default async function serverClientFactory<T>({
  url,
  method,
  body,
  params,
  headers,
}: MutatorConfig): Promise<T> {
  const tag = url.split('/')[1] || 'default';

  const commonHeaders = {
    'Content-Type': 'application/json',

    ...headers,
  };

  if (method === 'get') {
    const fetchOnce = async () => {
      console.log(`[FETCH] Realizando fetch para ${url} com tag "${tag}"`);
      const query = params ? `?${new URLSearchParams(params).toString()}` : '';
      const res = await fetch(`${API_URL}${url}${query}`, {
        method: 'GET',
        headers: commonHeaders,
        next: {
          tags: [tag],
          revalidate: 900,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        const err = new Error(data?.message ?? `HTTP ${res.status}`);
        (err as any).status = res.status;
        throw err;
      }

      return {
        ...data,
        serverTimestamp: new Date().toISOString(),
      } as T & { serverTimestamp: string };
    };

    return withRetry(fetchOnce, 4, 400);
  }

  const axiosConfig: AxiosRequestConfig = {
    url: `${API_URL}${url}`,
    method,
    data: body,
    params,
    headers: commonHeaders,
  };

  const axiosOnce = async () => {
    const response: AxiosResponse = await axios(axiosConfig);
    if (!(response.status >= 200 && response.status < 300)) {
      const err = new Error(response.statusText);
      (err as any).response = response;
      throw err;
    }
    return response.data as T;
  };

  const result = await withRetry(axiosOnce, 4, 400);

  if (['post', 'put', 'patch', 'delete'].includes(method)) {
    console.log(`Revalidating tag: ${tag}`);
    revalidateTag(tag);
  }

  return result;
}
