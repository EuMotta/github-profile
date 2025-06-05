import { GitProfile } from '@/@interfaces/github/profile';
import axios, { AxiosError } from 'axios';

import { CACHED_DATA_KEY, getCachedData, LAST_FETCH_KEY } from '@/utils/cache-utils';
import { handleApiError } from '@/utils/handleApiError';

import { errorList, FIFTEEN_MINUTES } from '@/constants';

import api, { headersGit as headers } from '../../api';

export async function getGithubProfile(username: string) {
  const cacheKey = `profile_${username}`;
  const cachedEvents = getCachedData<GitProfile>(cacheKey);
  if (cachedEvents) {
    return cachedEvents;
  }

  try {
    console.log('fetchj');
    const response = await api.get<GitProfile>(`/api/services/profile/github-profile/${username}`);
    localStorage.setItem(LAST_FETCH_KEY(cacheKey), Date.now().toString());
    localStorage.setItem(CACHED_DATA_KEY(cacheKey), JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}
