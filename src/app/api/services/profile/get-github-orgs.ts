import axios, { AxiosError } from 'axios';

import { errorList } from '@/constants';
import { gitMock } from '@/constants/github';
import { Organization } from '@/@interfaces/github/organization';

export async function getGithubOrgs(username: string) {
  try {
    const orgs = await axios.get<Organization[]>(
      `https://api.github.com/users/${username}/orgs?per_page=4`,
    );

    return orgs.data;
  } catch (error) {
    {
      const _error = error as AxiosError<{ message: string }>;
      if (_error.response) {
        const { status, data } = _error.response;

        const errorEntry = errorList.find((e) => e.statusCode === status);
        if (errorEntry) {
          throw new Error(data.message || errorEntry.message);
        }
      }
      throw new Error('Um erro inesperado aconteceu');
    }
  }
}
