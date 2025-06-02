import { getGithubContributions } from '@/app/api/services/profile/github-contributions/get-github-contributions';
import { FIFTEEN_MINUTES } from '@/constants';
import { useQuery } from '@tanstack/react-query';

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
