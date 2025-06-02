import { getGithubOrgs } from '@/app/api/services/profile/github-orgs/get-github-orgs';
import { FIFTEEN_MINUTES } from '@/constants';
import { useQuery } from '@tanstack/react-query';

export function useGetGithubOrgs(username: string) {
  return useQuery({
    queryKey: [`get-github-orgs-${username}`],
    queryFn: () => getGithubOrgs(username),
    staleTime: FIFTEEN_MINUTES,
    enabled: !!username,
    gcTime: FIFTEEN_MINUTES * 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
