import axios, { AxiosError } from 'axios';

import { errorList, FIFTEEN_MINUTES } from '@/constants';
import { GitRepository } from '@/@interfaces/github/project';
import { handleApiError } from '@/utils/handleApiError';
import { CACHED_DATA_KEY, getCachedData, LAST_FETCH_KEY } from '@/utils/cache-utils';

export async function getGithubRepositories(username: string) {
  const cacheKey = `repositories_${username}`;
  const cachedEvents = getCachedData<GitRepository>(cacheKey);
  if (cachedEvents) {
    return cachedEvents;
  }

  try {
    const repositories = await axios.get<GitRepository>(
      `https://api.github.com/search/repositories?q=user:${username}&sort=stars&order=desc&per_page=4`,
    );
    localStorage.setItem(LAST_FETCH_KEY(cacheKey), Date.now().toString());
    localStorage.setItem(
      CACHED_DATA_KEY(cacheKey),
      JSON.stringify(repositories.data),
    );
    return repositories.data;
  } catch (error) {
    handleApiError(error);
  }
}
