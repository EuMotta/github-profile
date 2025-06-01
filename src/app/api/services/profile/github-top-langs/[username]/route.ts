import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { errorList } from '@/constants';
import { handleApiError } from '@/utils/handleApiError';
import { calculateLanguagePercentages } from '@/utils/calculate-language-percentage';

// Define the TopLangData interface (intermediate data)
interface TopLangData {
  [language: string]: {
    name: string;
    color: string | null;
    size: number;
    count: number;
  };
}

// Define the LanguagePercentage interface (output)
interface LanguagePercentage {
  name: string;
  percentage: string;
}

// Server-safe cache
const cache = new Map<string, { data: LanguagePercentage[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const dynamic = 'force-dynamic'; // Prevent prerendering

const headers = {
  Accept: 'application/vnd.github.v3+json',
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  'X-GitHub-Api-Version': '2022-11-28',
};

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
  const { username } = params;
  const { searchParams } = new URL(request.url);
  const exclude_repo = searchParams.get('exclude_repo')?.split(',') || [];
  const size_weight = Number(searchParams.get('size_weight')) || 1;
  const count_weight = Number(searchParams.get('count_weight')) || 0;

  if (!process.env.GITHUB_TOKEN) {
    return NextResponse.json(
      { error: 'Server configuration error: GitHub token missing' },
      { status: 500 },
    );
  }

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  const cacheKey = `top_languages_${username}_${exclude_repo.join('_')}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return NextResponse.json(cached.data, { status: 200 });
  }

  try {
    const response = await axios.post(
      'https://api.github.com/graphql',
      {
        query: `
          query userInfo($login: String!) {
            user(login: $login) {
              repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
                nodes {
                  name
                  languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                    edges {
                      size
                      node {
                        color
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { login: username },
      },
      { headers },
    );

    if (response.data.errors) {
      const errorMessage = response.data.errors[0]?.message || 'GraphQL query failed';
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    let repoNodes = response.data.data.user.repositories.nodes;
    let repoToHide: { [key: string]: boolean } = {};

    exclude_repo.forEach((repoName) => {
      repoToHide[repoName] = true;
    });

    repoNodes = repoNodes
      .filter((node: any) => !repoToHide[node.name] && node.languages.edges.length > 0)
      .sort((a: any, b: any) => b.size - a.size);

    const languages = repoNodes
      .reduce((acc: any[], curr: any) => curr.languages.edges.concat(acc), [])
      .reduce((acc: TopLangData, prev: any) => {
        const langSize = prev.size;
        const langName = prev.node.name;

        if (acc[langName]) {
          acc[langName].size += langSize;
          acc[langName].count += 1;
        } else {
          acc[langName] = {
            name: langName,
            color: prev.node.color,
            size: langSize,
            count: 1,
          };
        }
        return acc;
      }, {});

    Object.keys(languages).forEach((name) => {
      languages[name].size =
        Math.pow(languages[name].size, size_weight) * Math.pow(languages[name].count, count_weight);
    });

    const topLangs = Object.keys(languages)
      .sort((a, b) => languages[b].size - languages[a].size)
      .reduce((result: TopLangData, key) => {
        result[key] = languages[key];
        return result;
      }, {});

    // Convert topLangs to LanguageUsage for calculateLanguagePercentages
    const languageUsage: Record<string, number> = Object.keys(topLangs).reduce(
      (acc, key) => {
        acc[key] = topLangs[key].size;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Calculate percentages
    const languagePercentages = calculateLanguagePercentages(languageUsage);

    // Cache the result
    cache.set(cacheKey, { data: languagePercentages, timestamp: Date.now() });

    return NextResponse.json(languagePercentages, { status: 200 });
  } catch (error) {
    const _error = error as AxiosError<{ message: string }>;
    console.error('Error fetching top languages:', _error.message, _error.response?.data);
    const errorMessage = handleApiError(_error) || 'An unexpected error occurred';
    if (_error.response) {
      const { status, data } = _error.response;
      const errorEntry = errorList.find((e) => e.statusCode === status);
      return NextResponse.json(
        { error: data?.message || errorEntry?.message || errorMessage },
        { status: status || 500 },
      );
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
