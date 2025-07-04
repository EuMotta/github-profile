import { getGithubFollowers } from '@/app/api/services/profile/github-followers/get-github-followers';
import { useQuery } from '@tanstack/react-query';

import { FIFTEEN_MINUTES } from '@/constants';

export function useGetGithubFollowers(username: string) {
  return useQuery({
    queryKey: [`get-github-followers-${username}`],
    queryFn: () => getGithubFollowers(username),
    staleTime: FIFTEEN_MINUTES,
    gcTime: FIFTEEN_MINUTES * 2,
    enabled: !!username,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
