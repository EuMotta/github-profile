import axios, { AxiosError } from 'axios';

import { handleApiError } from '@/utils/handleApiError';
import {
  CACHED_DATA_KEY,
  getCachedData,
  LAST_FETCH_KEY,
} from '@/utils/cache-utils';
import { GitGists } from '@/@interfaces/github/gists';
import { headersGit as headers } from '../api';

export async function getGithubGists(username: string) {
  const cacheKey = `gists_${username}`;
  const cachedEvents = getCachedData<GitGists[]>(cacheKey);
  if (cachedEvents) {
    return cachedEvents;
  }

  try {
    console.log('fetching gists for', username);
    const gists = await axios.get<GitGists[]>(
      `https://api.github.com/users/${username}/gists?per_page=4`,
      { headers },
    );
    localStorage.setItem(LAST_FETCH_KEY(cacheKey), Date.now().toString());
    localStorage.setItem(CACHED_DATA_KEY(cacheKey), JSON.stringify(gists.data));

    return gists.data;
  } catch (error) {
    handleApiError(error);
  }
}
