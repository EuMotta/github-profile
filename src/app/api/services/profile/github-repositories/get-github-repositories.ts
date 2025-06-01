import axios, { AxiosError } from 'axios';

import { errorList, FIFTEEN_MINUTES } from '@/constants';
import { GitRepository } from '@/@interfaces/github/project';
import { handleApiError } from '@/utils/handleApiError';
import {
  CACHED_DATA_KEY,
  getCachedData,
  LAST_FETCH_KEY,
} from '@/utils/cache-utils';
import api, { headersGit as headers } from '../../api';

export async function getGithubRepositories(username: string) {
  const cacheKey = `repositories_${username}`;
  const cachedEvents = getCachedData<GitRepository>(cacheKey);
  if (cachedEvents) {
    return cachedEvents;
  }

  try {
     const response = await api.get<GitRepository>(`/api/services/profile/github-repositories/${username}`);
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
