import axios, { AxiosError } from 'axios';

import { errorList, FIFTEEN_MINUTES } from '@/constants';
import { handleApiError } from '@/utils/handleApiError';
import {
  CACHED_DATA_KEY,
  getCachedData,
  LAST_FETCH_KEY,
} from '@/utils/cache-utils';
import { GitProfile } from '@/@interfaces/github/profile';

export async function getGithubProfile(username: string) {
  const cacheKey = `profile_${username}`;
  const cachedEvents = getCachedData<GitProfile[]>(cacheKey);
  if (cachedEvents) {
    return cachedEvents;
  }

  try {
    console.log('fetchj');
    const profile = await axios.get(
      `https://api.github.com/users/${username}`,
    );
    localStorage.setItem(LAST_FETCH_KEY(cacheKey), Date.now().toString());
    localStorage.setItem(
      CACHED_DATA_KEY(cacheKey),
      JSON.stringify(profile.data),
    );
    return profile.data;
  } catch (error) {
    handleApiError(error);
  }
}
