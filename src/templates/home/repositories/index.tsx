import { MdGroup, MdPersonAdd, MdFavorite } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FaCode,
  FaCodeBranch,
  FaEye,
  FaFilter,
  FaSearch,
  FaStar,
} from 'react-icons/fa';
import { gitMock } from '@/constants/github';
import { useParams } from 'next/navigation';
import { useGetGithubRepositories } from '@/hooks/github-repositories';

const Repositories = ({ username }: { username: string }) => {
  const { data } = useGetGithubRepositories(username);
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl font-semibold">
            <FaCode className="text-primary" />
            Top Repositories
          </CardTitle>
          <div className="flex gap-2">
            <Button size={'icon'}>
              <FaFilter className="text-sm" />
            </Button>
            <Button size={'icon'}>
              <FaSearch />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {data?.items.map((repo, index) => (
            <Card
              key={index}
              className="rounded-lg border bg-background p-4 transition-all duration-300 hover:border-primary hover:shadow-md hover:shadow-primary/20"
            >
              <div className="flex items-start justify-between">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer text-lg font-medium text-primary transition-colors duration-200 hover:text-primary"
                >
                  {repo.name}
                </a>
                <span
                  className={`rounded px-2 py-0.5 text-xs ${
                    repo.language === 'TypeScript'
                      ? 'bg-blue-900 text-blue-300'
                      : repo.language === 'JavaScript'
                        ? 'bg-yellow-900 text-yellow-300'
                        : 'bg-purple-900 text-purple-300'
                  }`}
                >
                  {repo.language || 'Other'}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-gray-400">
                {repo.description || 'Sem descrição'}
              </p>
              <div className="mt-4 flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <FaStar className="text-sm" />
                  {repo.stargazers_count}
                </div>
                <div className="flex items-center gap-1">
                  <FaCodeBranch className="text-sm" />
                  {repo.forks_count}
                </div>
                <div className="flex items-center gap-1">
                  <FaEye className="text-sm" />
                  {repo.watchers_count}
                </div>
              </div>
            </Card>
          ))}
        </div>{' '}
        <Button className="w-full" href={gitMock.repositories.repos_url}>
          View All Repositories
        </Button>
      </CardContent>
    </Card>
  );
};

export default Repositories;
