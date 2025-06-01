import axios, { AxiosError } from 'axios';

import { handleApiError } from '@/utils/handleApiError';
import {
  CACHED_DATA_KEY,
  getCachedData,
  LAST_FETCH_KEY,
} from '@/utils/cache-utils';
import api, { headersGit as headers } from '../../api';
import { GitLangs } from '@/@interfaces/github/langs';

export async function getGithubTopLangs(username: string) {
  const cacheKey = `top-langs_${username}`;
  const cachedEvents = getCachedData<GitLangs[]>(cacheKey);
  if (cachedEvents) {
    return cachedEvents;
  }

  try {
     const response = await api.get<GitLangs[]>(`/api/services/profile/github-top-langs/${username}`);
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
