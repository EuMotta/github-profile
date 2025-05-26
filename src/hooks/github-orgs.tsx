import { getGithubOrgs } from '@/app/api/services/profile/get-github-orgs';
import { useQuery } from '@tanstack/react-query';

export function useGetGithubOrgs(username: string) {
  return useQuery({
    queryKey: ['get-github-orgs'],
    queryFn: () => getGithubOrgs(username),
  });
}
