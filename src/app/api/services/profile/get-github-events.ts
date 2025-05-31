// src/lib/github-api.ts
import { GitEvents } from '@/@interfaces/github/events';
import { handleApiError } from '@/utils/handleApiError';
import api from '../api';
import {
  CACHED_DATA_KEY,
  getCachedData,
  LAST_FETCH_KEY,
} from '@/utils/cache-utils';
import { headersGit as headers } from '../api';

export async function getGithubEvents(username: string): Promise<GitEvents[]> {
  const cacheKey = `events_${username}`;
  const cachedEvents = getCachedData<GitEvents[]>(cacheKey);
  if (cachedEvents) {
    return cachedEvents;
  }

  try {
    console.log(`Fetching events for ${username}`);
    const response = await api.get<GitEvents[]>(
      `https://api.github.com/users/${username}/events?per_page=5`,
      { headers },
    );

    localStorage.setItem(LAST_FETCH_KEY(cacheKey), Date.now().toString());
    localStorage.setItem(
      CACHED_DATA_KEY(cacheKey),
      JSON.stringify(response.data),
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}
