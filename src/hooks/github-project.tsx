'use client';
import { getGithubProject } from '@/app/api/services/get-github-project';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { FIFTEEN_MINUTES } from '@/constants';

export function useGetGithubProject(repository: string) {
  return useQuery({
    queryKey: [`get-github-project-${repository}`],
    queryFn: () => getGithubProject(repository),
    staleTime: FIFTEEN_MINUTES,
    enabled: !!repository,
    gcTime: FIFTEEN_MINUTES * 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
