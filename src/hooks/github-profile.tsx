import { getGithubProfile } from '@/app/api/services/profile/get-github-profile';
import { useQuery } from '@tanstack/react-query';

export function useGetGithubProfile(username: string) {
  return useQuery({
    queryKey: ['get-github-profile'],
    queryFn: () => getGithubProfile(username),
  });
}
