import { getGithubProfile } from './profile/get-github-profile';
import axios, { AxiosError } from 'axios';
import calculateRank from '@/utils/calculate-rank';
import { errorList } from '@/constants';

const LAST_FETCH_KEY = (username: string) =>
  `github_stats_${username}_last_fetch`;
const CACHED_DATA_KEY = (username: string) => `github_stats_${username}_data`;

export async function getGithubStats(username: string) {
  const lastFetch = localStorage.getItem(LAST_FETCH_KEY(username));
  const now = Date.now();
  const fifteenMinutes = 15 * 60 * 1000;

  if (lastFetch && now - parseInt(lastFetch, 10) < fifteenMinutes) {
    const cachedData = localStorage.getItem(CACHED_DATA_KEY(username));
    if (cachedData) {
      return JSON.parse(cachedData);
    }
  }

  try {
    console.log('fetching stats for', username);
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
        getGithubProfile(username),
      ]);

    const totalCommits = commitsRes.data.total_count ?? 0;
    const totalPRs = prsRes.data.total_count ?? 0;
    const totalIssues = issuesRes.data.total_count ?? 0;

    const totalStars = reposRes.data.reduce((sum: number, repo: any) => {
      return sum + (repo.stargazers_count ?? 0);
    }, 0);

    const followers = userRes.followers ?? 0;
    const rank = calculateRank({
      all_commits: true,
      commits: totalCommits,
      prs: totalPRs,
      issues: totalIssues,
      repos: reposRes,
      stars: totalStars,
      followers,
    });

    const result = {
      rank,
      totalCommits,
      totalPRs,
      totalIssues,
      totalStars,
      followers,
    };

    localStorage.setItem(LAST_FETCH_KEY(username), now.toString());
    localStorage.setItem(CACHED_DATA_KEY(username), JSON.stringify(result));
    return result;
  } catch (error) {
    const _error = error as AxiosError<{ message?: string }>;
    if (_error.response) {
      const { status, data } = _error.response;
      const errorEntry = errorList.find((e) => e.statusCode === status);
      if (errorEntry) throw new Error(data?.message || errorEntry.message);
    }
    throw new Error('Um erro inesperado aconteceu');
  }
}
