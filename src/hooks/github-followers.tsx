import { getGithubFollowers } from '@/app/api/services/profile/get-github-followers';
import { FIFTEEN_MINUTES } from '@/constants';
import { useQuery } from '@tanstack/react-query';

export function useGetGithubFollowers(username: string) {
  return useQuery({
    queryKey: [`get-github-followers-${username}`],
    queryFn: () => getGithubFollowers(username),
    staleTime: FIFTEEN_MINUTES,
    gcTime: FIFTEEN_MINUTES * 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
