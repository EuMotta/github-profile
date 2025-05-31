import { getGithubEvents } from '@/app/api/services/profile/get-github-events';
import { FIFTEEN_MINUTES } from '@/constants';
import { useQuery } from '@tanstack/react-query';


export function useGetGithubEvents(username: string) {
  return useQuery({
    queryKey: [`get-github-events-${username}`, username],
    queryFn: () => getGithubEvents(username),
    staleTime: FIFTEEN_MINUTES,
    gcTime: FIFTEEN_MINUTES * 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
