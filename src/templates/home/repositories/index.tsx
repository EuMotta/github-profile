import { FaCode, FaCodeBranch, FaEye, FaFilter, FaSearch, FaStar } from 'react-icons/fa';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetGithubRepositories } from '@/hooks/github-repositories';
import { Item } from '@/@interfaces/github/project';
import React from 'react';

const languageStyles: Record<string, string> = {
  TypeScript: 'bg-blue-900 text-blue-300',
  JavaScript: 'bg-yellow-900 text-yellow-300',
  default: 'bg-purple-900 text-purple-300',
};

interface RepositoryStatProps {
  icon: React.ElementType;
  value: number;
}

const RepositoryStat: React.FC<RepositoryStatProps> = React.memo(({ icon: Icon, value }) => (
  <div className="flex items-center gap-1">
    <Icon className="text-sm" />
    <span>{value}</span>
  </div>
));

interface RepositoryCardProps {
  repo: Item;
}

const RepositoryCard: React.FC<RepositoryCardProps> = React.memo(({ repo }) => {
  const languageStyle = languageStyles[repo.language || 'default'] || languageStyles.default;

  return (
    <Card className="rounded-lg border bg-background p-4 transition-all duration-300 hover:border-primary hover:shadow-md hover:shadow-primary/20">
      <CardHeader className="p-0">
        <div className="flex items-start justify-between">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-dark text-lg font-medium text-primary transition-colors duration-200"
          >
            {repo.name}
          </a>
          <span className={`rounded px-2 py-0.5 text-xs ${languageStyle}`}>
            {repo.language || 'Other'}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <p className="mt-2 line-clamp-2 text-sm text-gray-400">
          {repo.description || 'No description available'}
        </p>
        <div className="mt-4 flex items-center space-x-4 text-sm text-gray-400">
          <RepositoryStat icon={FaStar} value={repo.stargazers_count} />
          <RepositoryStat icon={FaCodeBranch} value={repo.forks_count} />
          <RepositoryStat icon={FaEye} value={repo.watchers_count} />
        </div>
      </CardContent>
    </Card>
  );
});

interface RepositoryMessageProps {
  message: string;
}

const RepositoryMessage: React.FC<RepositoryMessageProps> = ({ message }) => (
  <p className="col-span-full text-center text-gray-400">{message}</p>
);

interface RepositoriesProps {
  username: string;
}

const Repositories: React.FC<RepositoriesProps> = ({ username }) => {
  const { data, isError, error } = useGetGithubRepositories(username);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl font-semibold">
            <FaCode className="text-primary" />
            Top Repositories
          </CardTitle>
          <div className="flex gap-2">
            <Button size="icon" aria-label="Filter repositories">
              <FaFilter className="text-sm" />
            </Button>
            <Button size="icon" aria-label="Search repositories">
              <FaSearch />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {isError && <RepositoryMessage message={error.message} />}
        {data?.items?.length === 0 && <RepositoryMessage message="No public repositories found" />}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {data?.items?.map((repo) => <RepositoryCard key={repo.id} repo={repo} />)}
        </div>
        <Button asChild className="w-full">
          <a href={`https://github.com/${username}?tab=repositories`}>View All Repositories</a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default Repositories;
