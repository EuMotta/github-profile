import { GitContributions } from '@/@interfaces/github/contributions';

import { CACHED_DATA_KEY, getCachedData, LAST_FETCH_KEY } from '@/utils/cache-utils';
import { handleApiError } from '@/utils/handleApiError';

import api from '../../api';

export async function getGithubContributions(username: string): Promise<GitContributions> {
  const cacheKey = `contributions_${username}`;
  const cachedEvents = getCachedData<GitContributions>(cacheKey);
  if (cachedEvents) {
    return cachedEvents;
  }

  try {
    console.log(`Fetching contributions for ${username}`);
    const response = await api.get<GitContributions>(
      `/api/services/profile/github-contributions/${username}`,
    );

    localStorage.setItem(LAST_FETCH_KEY(cacheKey), Date.now().toString());
    localStorage.setItem(CACHED_DATA_KEY(cacheKey), JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}
