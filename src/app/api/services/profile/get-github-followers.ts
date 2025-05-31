import axios, { AxiosError } from 'axios';

import { GitFollowers } from '@/@interfaces/github/followers';
import { handleApiError } from '@/utils/handleApiError';
import {
  CACHED_DATA_KEY,
  getCachedData,
  LAST_FETCH_KEY,
} from '@/utils/cache-utils';
import { headersGit as headers } from '../api';

export async function getGithubFollowers(username: string) {
  const cacheKey = `followers_${username}`;
  const cachedEvents = getCachedData<GitFollowers[]>(cacheKey);
  if (cachedEvents) {
    return cachedEvents;
  }

  try {
    console.log('fetching followers for', username);
    const followers = await axios.get<GitFollowers[]>(
      `https://api.github.com/users/${username}/followers?per_page=5`,
      { headers },
    );
    localStorage.setItem(LAST_FETCH_KEY(cacheKey), Date.now().toString());
    localStorage.setItem(
      CACHED_DATA_KEY(cacheKey),
      JSON.stringify(followers.data),
    );

    return followers.data;
  } catch (error) {
    handleApiError(error);
  }
}
