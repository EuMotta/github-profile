import axios, { AxiosError } from 'axios';

import calculateRank from '@/utils/calculate-rank';

import { errorList } from '@/constants';

export async function getGithubStats(username: string) {
  try {

    const headers = {
      Accept: 'application/vnd.github.cloak-preview+json',
    };

    const [commitsRes, prsRes, issuesRes, reposRes, userRes] =
      await Promise.all([
        axios.get(
          `https://api.github.com/search/commits?q=author:${username}`,
          {
            headers,
          },
        ),

        axios.get(
          `https://api.github.com/search/issues?q=type:pr+author:${username}`,
        ),

        axios.get(
          `https://api.github.com/search/issues?q=type:issue+author:${username}`,
        ),

        axios.get(
          `https://api.github.com/users/${username}/repos?per_page=100`,
        ),

        axios.get(`https://api.github.com/users/${username}`),
      ]);

    const totalCommits = commitsRes.data.total_count ?? 0;
    const totalPRs = prsRes.data.total_count ?? 0;
    const totalIssues = issuesRes.data.total_count ?? 0;

    const totalStars = reposRes.data.reduce((sum: number, repo: any) => {
      return sum + (repo.stargazers_count ?? 0);
    }, 0);

    const followers = userRes.data.followers ?? 0;
    const rank = calculateRank({
      all_commits: true,
      commits: totalCommits,
      prs: totalPRs,
      issues: totalIssues,
      repos: reposRes,
      stars: totalStars,
      followers: followers,
    });
    return {
      rank,
      totalCommits,
      totalPRs,
      totalIssues,
      totalStars,
      followers,
    };
  } catch (error) {
    const _error = error as AxiosError<{ message?: string }>;

    if (_error.response) {
      const { status, data } = _error.response;

      const errorEntry = errorList.find((e) => e.statusCode === status);
      if (errorEntry) {
        throw new Error(data?.message || errorEntry.message);
      }
    }

    console.error('Erro inesperado ao buscar stats do GitHub:', error);
    throw new Error('Um erro inesperado aconteceu');
  }
}
