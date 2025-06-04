'use client';
import { FaCode, FaCodeBranch, FaEye, FaFilter, FaSearch, FaStar } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetGithubRepositories } from '@/hooks/github-repositories';
import { Item } from '@/@interfaces/github/project';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Response } from '@/components/common/response';

const languageStyles: Record<string, string> = {
  TypeScript: 'bg-blue-900 text-blue-300',
  JavaScript: 'bg-yellow-900 text-yellow-300',
  Python: 'bg-indigo-900 text-indigo-300',
  Java: 'bg-red-900 text-red-300',
  C: 'bg-gray-800 text-gray-300',
  'C++': 'bg-sky-900 text-sky-300',
  'C#': 'bg-purple-900 text-purple-300',
  Go: 'bg-cyan-900 text-cyan-300',
  Rust: 'bg-orange-900 text-orange-300',
  Ruby: 'bg-rose-900 text-rose-300',
  PHP: 'bg-indigo-800 text-indigo-200',
  Swift: 'bg-orange-700 text-orange-200',
  Kotlin: 'bg-purple-800 text-purple-200',
  Dart: 'bg-sky-800 text-sky-200',
  HTML: 'bg-orange-800 text-orange-300',
  CSS: 'bg-blue-800 text-blue-200',
  SCSS: 'bg-pink-900 text-pink-300',
  Shell: 'bg-green-900 text-green-300',
  Bash: 'bg-green-900 text-green-300',
  JSON: 'bg-neutral-800 text-neutral-300',
  YAML: 'bg-amber-900 text-amber-300',
  Markdown: 'bg-gray-700 text-gray-300',
  SQL: 'bg-teal-900 text-teal-300',
  R: 'bg-sky-950 text-sky-300',
  Perl: 'bg-fuchsia-900 text-fuchsia-300',
  Lua: 'bg-blue-950 text-blue-200',
  Haskell: 'bg-violet-900 text-violet-300',
  Elixir: 'bg-purple-950 text-purple-300',
  default: 'bg-zinc-800 text-zinc-300',
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
        <p className="mt-2 line-clamp-2 text-sm">
          {repo.description || 'No description available'}
        </p>
        <div className="mt-4 flex items-center space-x-4 text-sm">
          <RepositoryStat icon={FaStar} value={repo.stargazers_count} />
          <RepositoryStat icon={FaCodeBranch} value={repo.forks_count} />
          <RepositoryStat icon={FaEye} value={repo.watchers_count} />
        </div>
      </CardContent>
    </Card>
  );
});

interface MessageProps {
  message: string;
}

export const Message: React.FC<MessageProps> = ({ message }) => (
  <p className="col-span-full text-center text-primary">{message}</p>
);

interface RepositoriesProps {
  username: string;
}

const Repositories: React.FC<RepositoriesProps> = ({ username }) => {
  const { data, isError, error, isLoading } = useGetGithubRepositories(username);

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
        {isError && (
          <Response image="/stickers/sad.png" title="Oops!" description={error.message} />
        )}

        {data?.items?.length === 0 && (
          <Response image="/stickers/sad.png" title="Oops!" description="No repositories found" />
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {isLoading && Array.from({ length: 4 }, (_, i) => <Skeleton key={i} className="h-32" />)}

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
