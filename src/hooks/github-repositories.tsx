import { getGithubRepositories } from '@/app/api/services/profile/get-github-repositories';
import { useQuery } from '@tanstack/react-query';

export function useGetGithubRepositories(username: string) {
  return useQuery({
    queryKey: ['get-github-repositories'],
    queryFn: () => getGithubRepositories(username),
  });
}
