import axios, { AxiosError } from 'axios';

import { Organization } from '@/@interfaces/github/organization';
import { handleApiError } from '@/utils/handleApiError';
import {
  CACHED_DATA_KEY,
  getCachedData,
  LAST_FETCH_KEY,
} from '@/utils/cache-utils';
import { headersGit as headers } from '../api';

export async function getGithubOrgs(username: string) {
  const cacheKey = `orgs_${username}`;
  const cachedEvents = getCachedData<Organization[]>(cacheKey);
  if (cachedEvents) {
    return cachedEvents;
  }

  try {
    console.log('fetching organizations for', username);
    const orgs = await axios.get<Organization[]>(
      `https://api.github.com/users/${username}/orgs?per_page=4`,
      { headers },
    );
    localStorage.setItem(LAST_FETCH_KEY(cacheKey), Date.now().toString());
    localStorage.setItem(CACHED_DATA_KEY(cacheKey), JSON.stringify(orgs.data));

    return orgs.data;
  } catch (error) {
    handleApiError(error);
  }
}
