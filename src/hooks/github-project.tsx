'use client';
import { getGithubProject } from '@/app/api/services/get-github-project';
import { FIFTEEN_MINUTES } from '@/constants';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export function useGetGithubProject(repository: string) {
  return useQuery({
    queryKey: [`get-github-project-${repository}`],
    queryFn: () => getGithubProject(repository),
    staleTime: FIFTEEN_MINUTES,
    gcTime: FIFTEEN_MINUTES * 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
