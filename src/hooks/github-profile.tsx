import { getGithubProfile } from '@/app/api/services/profile/github-profile/get-github-profile';
import { useQuery } from '@tanstack/react-query';

export function useGetGithubProfile(username: string) {
  return useQuery({
    queryKey: [`get-github-profile-${username}`],
    queryFn: () => getGithubProfile(username),
    staleTime: 5 * 60 * 1000,
    enabled: !!username,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
  });
}
