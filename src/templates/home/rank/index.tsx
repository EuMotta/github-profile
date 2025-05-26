import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import { FaCodeBranch, FaStar, FaCodePullRequest } from 'react-icons/fa6';

import { useGetGithubStats } from '@/hooks/github-stats';
import ProgressCounter from '@/components/counter';

const Rank = () => {
  const {
    data: rank,
    isLoading: isLoadingRank,
    isError: isErrorRank,
  } = useGetGithubStats();

  if (isErrorRank || !rank)
    return <p className="text-red-500">Erro ao carregar status do GitHub.</p>;
  if (isLoadingRank)
    return <p className="text-cyan-400">Carregando status...</p>;

  return (
    <div>
      <div className="space-y-1 p-4 text-white">
        <div className="grid grid-cols-3 gap-10 text-sm">
          <div className="col-span-2">
            <h3 className="text-xl font-bold">Github Status</h3>
            <dl className="space-y-1">
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-2 text-xs text-primary">
                  <FaCodeBranch className="text-base" /> Commits
                </dt>
                <dd className="font-medium text-secondary">
                  <ProgressCounter
                    duration={2500}
                    targetValue={rank?.totalCommits}
                  />
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-2 text-xs text-primary">
                  <FaCodePullRequest className="text-base" /> Pull Requests
                </dt>
                <dd className="font-medium text-secondary">
                  {' '}
                  <ProgressCounter
                    duration={2500}
                    targetValue={rank?.totalPRs}
                  />
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-2 text-xs text-primary">
                  <FaExclamationCircle className="text-base" /> Issues
                </dt>
                <dd className="font-medium text-secondary">
                  <ProgressCounter
                    duration={2500}
                    targetValue={rank?.totalIssues}
                  />
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-2 text-xs text-primary">
                  <FaStar className="text-base" /> Stars
                </dt>
                <dd className="font-medium text-secondary">
                  <ProgressCounter
                    duration={2500}
                    targetValue={rank?.totalStars}
                  />
                </dd>
              </div>
            </dl>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <span className="px-1 py-1 text-7xl text-primary">
              {rank?.rank.level}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rank;
