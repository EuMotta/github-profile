import axios, { AxiosError } from 'axios';

import { errorList } from '@/constants';
import { gitMock } from '@/constants/github';

export async function getGithubProfile(username: string) {

  try {
    const profile = await axios.get(`https://api.github.com/users/${username}`);
    
    return profile.data;
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
