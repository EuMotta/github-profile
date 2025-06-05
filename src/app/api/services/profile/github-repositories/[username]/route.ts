import { NextRequest, NextResponse } from 'next/server';

import axios from 'axios';

const headers = {
  Accept: 'application/vnd.github.cloak-preview+json',
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  'X-GitHub-Api-Version': '2022-11-28',
};

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
  const { username } = params;

  try {
    const response = await axios.get(
      `https://api.github.com/search/repositories?q=user:${username}&sort=stars&order=desc&per_page=4`,
      { headers },
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    if (error.response?.status === 422) {
      return NextResponse.json(
        { message: 'Repositories without permission to access' },
        { status: 422 },
      );
    } else if (error.response) {
      return NextResponse.json(
        {
          message: error.response.data.message || 'GitHub API error',
          errors: error.response.data.errors || [],
        },
        { status: error.response.status },
      );
    } else if (error.request) {
      return NextResponse.json({ message: 'Failed to connect to GitHub API' }, { status: 503 });
    } else {
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  }
}
