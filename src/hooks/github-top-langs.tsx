import { getGithubTopLangs } from '@/app/api/services/profile/github-top-langs/get-github-top-langs';
import { useQuery } from '@tanstack/react-query';

import { FIFTEEN_MINUTES } from '@/constants';

export function useGetGithubTopLangs(username: string) {
  return useQuery({
    queryKey: [`get-github-top-langs-${username}`],
    queryFn: () => getGithubTopLangs(username),
    staleTime: FIFTEEN_MINUTES,
    gcTime: FIFTEEN_MINUTES * 2,
    enabled: !!username,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
