import serverClientFactory from '../../server';
import { FindProfileByName, GitProfile } from '../interfaces/profile';


const headers = {
  Accept: 'application/vnd.github.cloak-preview+json',
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  'X-GitHub-Api-Version': '2022-11-28',
};
export const getGithubData = () => {
  const findProfileByName = (username: string) => {
    return serverClientFactory<GitProfile>({
      url: `/users/${username}`,
      method: 'get',
      headers,
    });
  };

  return { findProfileByName };
};
