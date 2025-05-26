'use client';
import { getGithubProject } from '@/app/api/services/get-github-project';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export function useGetGithubProject(repository: string) {
  return useQuery({
    queryKey: ['get-github-project'],
    queryFn: () => getGithubProject(repository),
  });
}
