import { getGithubRepositories } from '@/app/api/services/profile/github-repositories/get-github-repositories';
import { useQuery } from '@tanstack/react-query';

import { FIFTEEN_MINUTES } from '@/constants';

export function useGetGithubRepositories(username: string) {
  return useQuery({
    queryKey: [`get-github-repositories-${username}`],
    queryFn: () => getGithubRepositories(username),
    staleTime: FIFTEEN_MINUTES,
    enabled: !!username,
    gcTime: FIFTEEN_MINUTES * 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
