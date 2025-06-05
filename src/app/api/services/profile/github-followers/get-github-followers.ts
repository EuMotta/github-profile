import { GitFollowers } from '@/@interfaces/github/followers';
import axios, { AxiosError } from 'axios';

import { CACHED_DATA_KEY, getCachedData, LAST_FETCH_KEY } from '@/utils/cache-utils';
import { handleApiError } from '@/utils/handleApiError';

import api from '../../api';

export async function getGithubFollowers(username: string) {
  const cacheKey = `followers_${username}`;
  const cachedEvents = getCachedData<GitFollowers[]>(cacheKey);
  if (cachedEvents) {
    return cachedEvents;
  }

  try {
    console.log('fetching followers for', username);
    const response = await api.get<GitFollowers[]>(
      `/api/services/profile/github-followers/${username}`,
    );

    localStorage.setItem(LAST_FETCH_KEY(cacheKey), Date.now().toString());
    localStorage.setItem(CACHED_DATA_KEY(cacheKey), JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}
