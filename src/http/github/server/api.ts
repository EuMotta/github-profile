import serverClientFactory from '../../server';
import { FindProfileByName, GitProfile } from '../interfaces/profile';

export const getGithubData = () => {
  const findProfileByName = (username: FindProfileByName) => {
    return serverClientFactory<GitProfile>({
      url: `/users/${username}`,
      method: 'get',
    });
  };
  return { findProfileByName };
};
