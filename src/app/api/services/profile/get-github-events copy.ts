import axios, { AxiosError } from 'axios';

import { errorList } from '@/constants';
import { gitMock } from '@/constants/github';

export async function getGithubProfile() {
  try {
    const username = 'torvalds';

    const [
      userResult,
      followersResult,
      repositoriesResult,
      gistsResult,
      eventsResult,
    ] = await Promise.allSettled([
      axios.get(`https://api.github.com/users/${username}`),
      axios.get(
        `https://api.github.com/users/${username}/followers?per_page=5`,
      ),
      axios.get(
        `https://api.github.com/search/repositories?q=user:${username}&sort=stars&order=desc&per_page=4`,
      ),
      axios.get(`https://api.github.com/users/${username}/gists?per_page=4`),
      axios.get(`https://api.github.com/users/${username}/events?per_page=5`),
    ]);

    const getData = (result: PromiseSettledResult<any>) =>
      result.status === 'fulfilled' ? result.value.data : null;

    const userData = getData(userResult);
    const followers = getData(followersResult);
    const repositories = getData(repositoriesResult);
    const gists = getData(gistsResult);
    const events = getData(eventsResult);

    return {
      ...(userData || {}),
      followers: {
        total_count: userData?.followers ?? 0,
        items: followers ?? [],
      },
      repositories: repositories ?? [],
      gists: gists ?? [],
      events: events ?? [],
    };
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
