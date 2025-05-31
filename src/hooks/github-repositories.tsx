import { getGithubRepositories } from '@/app/api/services/profile/get-github-repositories';
import { FIFTEEN_MINUTES } from '@/constants';
import { useQuery } from '@tanstack/react-query';

export function useGetGithubRepositories(username: string) {
  return useQuery({
    queryKey: [`get-github-repositories-${username}`],
    queryFn: () => getGithubRepositories(username),
    staleTime: FIFTEEN_MINUTES,
    gcTime: FIFTEEN_MINUTES * 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
