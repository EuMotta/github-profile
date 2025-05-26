import { getGithubFollowers } from '@/app/api/services/profile/get-github-followers';
import { GitProfile } from '@/http/github/interfaces/profile';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export function useGetGithubFollowers(username: string) {
  return useQuery({
    queryKey: ['get-github-followers'],
    queryFn: () => getGithubFollowers(username),
  });
}
