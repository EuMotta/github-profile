import axios, { AxiosError } from 'axios';

import { errorList } from '@/constants';
import { gitMock } from '@/constants/github';
import { GitFollowers } from '@/@interfaces/github/followers';

export async function getGithubFollowers(username: string) {
  try {
    const followers = await axios.get<GitFollowers[]>(
      `https://api.github.com/users/${username}/followers?per_page=5`,
    );

    return followers.data;
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
