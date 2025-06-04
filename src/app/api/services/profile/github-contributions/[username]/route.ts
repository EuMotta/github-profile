import { NextRequest, NextResponse } from 'next/server';
import { handleApiError } from '@/utils/handleApiError';

interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface Streak {
  start: string | null;
  end: string | null;
  length: number;
}

interface ContributionStats {
  totalContributions: number;
  firstContribution: string | null;
  currentStreak: Streak;
  longestStreak: Streak;
  monthlyContributions: { month: string; count: number }[];
}

function calculateContributionStats(days: ContributionDay[]): ContributionStats {
  let totalContributions = 0;
  let firstContribution: string | null = null;
  const monthlyMap: Record<string, number> = {};
  const today = new Date().toISOString().slice(0, 10);

  let currentStreakLength = 0;
  let currentStreakStart: string | null = null;

  const currentStreak: Streak = { start: today, end: today, length: 0 };
  const longestStreak: Streak = { start: null, end: null, length: 0 };

  const sorted = [...days].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  for (const { date, contributionCount } of sorted) {
    totalContributions += contributionCount;

    const monthKey = date.slice(0, 7); // "YYYY-MM"
    if (!monthlyMap[monthKey]) {
      monthlyMap[monthKey] = 0;
    }
    monthlyMap[monthKey] += contributionCount;

    if (contributionCount > 0) {
      if (currentStreakLength === 0) {
        currentStreakStart = date;
      }
      currentStreakLength++;

      currentStreak.start = currentStreakStart;
      currentStreak.end = date;
      currentStreak.length = currentStreakLength;

      if (!firstContribution) {
        firstContribution = date;
      }

      if (currentStreakLength > longestStreak.length) {
        longestStreak.start = currentStreakStart;
        longestStreak.end = date;
        longestStreak.length = currentStreakLength;
      }
    } else if (date !== today) {
      currentStreakLength = 0;
      currentStreakStart = null;
      currentStreak.start = today;
      currentStreak.end = today;
      currentStreak.length = 0;
    }
  }

  const monthlyContributions = Object.entries(monthlyMap)
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

  return {
    totalContributions,
    firstContribution,
    currentStreak,
    longestStreak,
    monthlyContributions,
  };
}

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
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

    const variables = { user: username, start: startDate, end: endDate };

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
      { status: 200 },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
