import React from 'react';
import { FaCode, FaExclamationCircle } from 'react-icons/fa';
import { FaCodeBranch, FaStar, FaCodePullRequest } from 'react-icons/fa6';
import { useGetGithubStats } from '@/hooks/github-stats';
import ProgressCounter from '@/components/counter';

interface StatItemProps {
  icon: React.ElementType;
  label: string;
  value: number;
}

const StatItem: React.FC<StatItemProps> = ({ icon: Icon, label, value }) => (
  <div className="flex items-center justify-between">
    <dt className="flex items-center gap-2 text-xs text-primary">
      <Icon className="text-base" />
      {label}
    </dt>
    <dd className="font-medium text-secondary">
      <ProgressCounter duration={2500} targetValue={value} />
    </dd>
  </div>
);

interface StatusMessageProps {
  message: string;
  textColor: string;
}
interface RankProps {
  username: string;
}
const StatusMessage: React.FC<StatusMessageProps> = ({ message, textColor }) => (
  <p className={`text-center ${textColor}`}>{message}</p>
);

const Rank: React.FC<RankProps> = ({ username }) => {
  const { data: stats, isLoading, isError } = useGetGithubStats(username);

  if (isError || !stats) {
    return <StatusMessage message="Error loading GitHub stats" textColor="text-red-500" />;
  }

  if (isLoading) {
    return <StatusMessage message="Loading stats..." textColor="text-cyan-400" />;
  }

  const statItems: StatItemProps[] = [
    { icon: FaCodeBranch, label: 'Commits', value: stats.totalCommits },
    { icon: FaCodePullRequest, label: 'Pull Requests', value: stats.totalPRs },
    { icon: FaExclamationCircle, label: 'Issues', value: stats.totalIssues },
    { icon: FaStar, label: 'Stars', value: stats.totalStars },
  ];

  return (
    <div>
      <div className="mt-8 border-t border-border pt-6">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <FaCode className="text-primary" />
          Rank
        </h3>
        <div className="grid grid-cols-3 gap-10 text-sm">
          <div className="col-span-2">
            <dl className="space-y-1">
              {statItems.map((item) => (
                <StatItem key={item.label} icon={item.icon} label={item.label} value={item.value} />
              ))}
            </dl>
          </div>
          <div className="flex items-center justify-center">
            <span className="px-1 py-1 text-7xl text-primary">{stats.rank.level}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rank;
