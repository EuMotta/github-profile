import { getGithubContributions } from '@/app/api/services/profile/github-contributions/get-github-contributions';
import { useQuery } from '@tanstack/react-query';

import { FIFTEEN_MINUTES } from '@/constants';

export function useGetGithubContributions(username: string) {
  return useQuery({
    queryKey: [`get-github-contributions-${username}`, username],
    queryFn: () => getGithubContributions(username),
    staleTime: FIFTEEN_MINUTES,
    enabled: !!username,
    gcTime: FIFTEEN_MINUTES * 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
