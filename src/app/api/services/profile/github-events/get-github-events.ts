import { GitEvents } from '@/@interfaces/github/events';

import { CACHED_DATA_KEY, getCachedData, LAST_FETCH_KEY } from '@/utils/cache-utils';
import { handleApiError } from '@/utils/handleApiError';

import api from '../../api';

export async function getGithubEvents(username: string): Promise<GitEvents[]> {
  const cacheKey = `events_${username}`;
  const cachedEvents = getCachedData<GitEvents[]>(cacheKey);
  if (cachedEvents) {
    return cachedEvents;
  }

  try {
    // console.log(`Fetching events for ${username}`);
    const response = await api.get<GitEvents[]>(`/api/services/profile/github-events/${username}`);

    localStorage.setItem(LAST_FETCH_KEY(cacheKey), Date.now().toString());
    localStorage.setItem(CACHED_DATA_KEY(cacheKey), JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}
