import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { handleApiError } from '@/utils/handleApiError';

const headers = {
  Accept: 'application/vnd.github.cloak-preview+json',
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  'X-GitHub-Api-Version': '2022-11-28',
};

function calculateContributionStats(days: { date: string; contributionCount: number }[]) {
  let stats = {
    totalContributions: 0,
    firstContribution: null as string | null,
    currentStreak: { start: null as string | null, end: null as string | null, length: 0 },
    longestStreak: { start: null as string | null, end: null as string | null, length: 0 },
  };

  let today = new Date().toISOString().split('T')[0];
  let currentStreakLength = 0;
  let currentStreakStart: string | null = null;

  const sorted = [...days].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  for (const { date, contributionCount } of sorted) {
    stats.totalContributions += contributionCount;

    if (contributionCount > 0) {
      if (currentStreakLength === 0) currentStreakStart = date;

      currentStreakLength++;
      stats.currentStreak = {
        start: currentStreakStart,
        end: date,
        length: currentStreakLength,
      };

      if (!stats.firstContribution) {
        stats.firstContribution = date;
      }

      if (currentStreakLength > stats.longestStreak.length) {
        stats.longestStreak = {
          start: currentStreakStart,
          end: date,
          length: currentStreakLength,
        };
      }
    } else if (date !== today) {
      currentStreakLength = 0;
      currentStreakStart = null;
      stats.currentStreak = { start: today, end: today, length: 0 };
    }
  }

  return stats;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  const { username } = params;

  try {
    const now = new Date();
    const endDate = now.toISOString();
    const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1)).toISOString();
    const startDate = oneYearAgo;

    const query = `
      query ($user: String!, $start: DateTime!, $end: DateTime!) {
        user(login: $user) {
          createdAt
          contributionsCollection(from: $start, to: $end) {
            contributionYears
            contributionCalendar {
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;

    const variables = {
      user: username,
      start: startDate,
      end: endDate,
    };

    const graphQLRes = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });

    const graphQLData = await graphQLRes.json();
    const weeks =
      graphQLData?.data?.user?.contributionsCollection?.contributionCalendar?.weeks || [];

    const days = weeks.flatMap((week: any) => week.contributionDays);

    const stats = calculateContributionStats(days);

    return NextResponse.json(
      {
        ...graphQLData.data,
        contributionStats: stats,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
