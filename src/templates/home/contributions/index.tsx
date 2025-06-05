'use client';
import React from 'react';
import { MdHistory } from 'react-icons/md';

import ContributionsTable from '@/components/contributions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetGithubContributions } from '@/hooks/github-contributions';

interface RecentActivityProps {
  username: string;
}

const Contributions: React.FC<RecentActivityProps> = ({ username }) => {
  const {
    data: contributions,
    error: errorContributions,
    isError: isErrorContributions,
    isLoading: isLoadingContributions,
  } = useGetGithubContributions(username);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-xl font-semibold">
          <div className="flex items-center gap-2">
            <MdHistory className="text-primary" />
            Last year Contributions
          </div>
          {contributions?.contributionStats.totalContributions}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {isErrorContributions && <span>{errorContributions.message}</span>}

        {isLoadingContributions && <span>Loading Contributions...</span>}

        {contributions && <ContributionsTable contributions={contributions} />}

        <Button className="mt-6 w-full">View All Activity</Button>
      </CardContent>
    </Card>
  );
};

export default Contributions;
