import { Organization } from '@/@interfaces/github/organization';
import axios, { AxiosError } from 'axios';

import { CACHED_DATA_KEY, getCachedData, LAST_FETCH_KEY } from '@/utils/cache-utils';
import { handleApiError } from '@/utils/handleApiError';

import api, { headersGit as headers } from '../../api';

export async function getGithubOrgs(username: string) {
  const cacheKey = `orgs_${username}`;
  const cachedEvents = getCachedData<Organization[]>(cacheKey);
  if (cachedEvents) {
    return cachedEvents;
  }

  try {
    // console.log('fetching organizations for', username);
    const response = await api.get<Organization[]>(`/api/services/profile/github-orgs/${username}`);
    localStorage.setItem(LAST_FETCH_KEY(cacheKey), Date.now().toString());
    localStorage.setItem(CACHED_DATA_KEY(cacheKey), JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}
