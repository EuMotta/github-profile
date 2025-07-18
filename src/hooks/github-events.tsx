import { getGithubEvents } from '@/app/api/services/profile/github-events/get-github-events';
import { useQuery } from '@tanstack/react-query';

import { FIFTEEN_MINUTES } from '@/constants';

export function useGetGithubEvents(username: string) {
  return useQuery({
    queryKey: [`get-github-events-${username}`, username],
    queryFn: () => getGithubEvents(username),
    staleTime: FIFTEEN_MINUTES,
    enabled: !!username,
    gcTime: FIFTEEN_MINUTES * 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
