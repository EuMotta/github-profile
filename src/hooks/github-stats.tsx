'use client';
import { getGithubStats } from '@/app/api/services/get-github-stats';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { FIFTEEN_MINUTES } from '@/constants';

export interface Stats {
  rank: Rank;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  totalStars: number;
  followers: number;
}

export interface Rank {
  level: string;
  percentile: number;
}

export function useGetGithubStats(username: string) {
  return useQuery({
    queryKey: [`get-github-stats-${username}`],
    queryFn: () => getGithubStats(username),
    staleTime: FIFTEEN_MINUTES,
    enabled: !!username,
    gcTime: FIFTEEN_MINUTES * 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
