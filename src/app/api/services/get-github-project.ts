/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError } from 'axios';

import { calculateLanguagePercentages } from '@/utils/calculate-language-percentage';
import { decodeBase64Content } from '@/utils/decode';
import { handleApiError } from '@/utils/handleApiError';

import { errorList, FIFTEEN_MINUTES } from '@/constants';

const LAST_FETCH_KEY = (repository: string) => `github_project_${repository}_last_fetch`;
const CACHED_DATA_KEY = (repository: string) => `github_project_${repository}_data`;

export async function getGithubProject(repository: string) {
  const lastFetch = localStorage.getItem(LAST_FETCH_KEY(repository));
  const now = Date.now();

  if (lastFetch && now - parseInt(lastFetch, 10) < FIFTEEN_MINUTES) {
    const cachedData = localStorage.getItem(CACHED_DATA_KEY(repository));
    if (cachedData) {
      return JSON.parse(cachedData);
    }
  }

  try {
    const username = 'EuMotta';
    console.log('fetching project data for', `${username}/${repository}`);

    const [projectResponse, languagesResponse, contributorsResponse] = await Promise.all([
      axios.get(`https://api.github.com/repos/${username}/${repository}`),
      axios.get(`https://api.github.com/repos/${username}/${repository}/languages`),
      axios.get(`https://api.github.com/repos/${username}/${repository}/contributors`),
    ]);

    const result = {
      project: {
        ...projectResponse.data,
        languages: calculateLanguagePercentages(languagesResponse.data),
        contributors: contributorsResponse.data,
      },
    };

    localStorage.setItem(LAST_FETCH_KEY(repository), now.toString());
    localStorage.setItem(CACHED_DATA_KEY(repository), JSON.stringify(result));
    return result;
  } catch (error) {
    handleApiError(error);
  }
}
