/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError } from 'axios';

import { decodeBase64Content } from '@/utils/decode';
import { calculateLanguagePercentages } from '@/utils/calculate-language-percentage';

import { errorList } from '@/constants';

export async function getGithubProject(repository: string) {
  try {
    const username = 'EuMotta';

    const [projectResponse, languagesResponse, contributorsResponse] =
      await Promise.all([
        axios.get(`https://api.github.com/repos/${username}/${repository}`),
        axios.get(
          `https://api.github.com/repos/${username}/${repository}/languages`,
        ),
        axios.get(
          `https://api.github.com/repos/${username}/${repository}/contributors`,
        ),
      ]);
    console.log(projectResponse);
    return {
      project: {
        ...projectResponse.data,
        languages: calculateLanguagePercentages(languagesResponse.data),
        contributors: contributorsResponse.data,
      },
    };
  } catch (error) {
    const _error = error as AxiosError<{ message?: string }>;

    if (_error.response) {
      const { status, data } = _error.response;

      const errorEntry = errorList.find((e) => e.statusCode === status);
      if (errorEntry) {
        throw new Error(data?.message || errorEntry.message);
      }
    }

    console.error('Erro inesperado ao buscar stats do GitHub:', error);
    throw new Error('Um erro inesperado aconteceu');
  }
}
