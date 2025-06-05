import { NextResponse } from 'next/server';

import axios from 'axios';

import { handleApiError } from '@/utils/handleApiError';

const headers = {
  Accept: 'application/vnd.github.cloak-preview+json',
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  'X-GitHub-Api-Version': '2022-11-28',
};

export async function GET() {
  try {
    const response = await axios.get(
      `https://api.github.com/search/users?q=followers:>100000&sort=followers&order=desc`,
      {
        headers,
      },
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    handleApiError(error);
  }
}
