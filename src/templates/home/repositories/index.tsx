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

const Repositories = () => {
  const repositories = [
    {
      name: 'next-ai-starter',
      lang: 'TypeScript',
      stars: 1243,
      forks: 234,
      desc: 'A starter template for AI-powered Next.js applications',
    },
    {
      name: 'react-data-grid',
      lang: 'JavaScript',
      stars: 875,
      forks: 156,
      desc: 'High-performance React data grid component',
    },
    {
      name: 'tailwind-components',
      lang: 'CSS',
      stars: 642,
      forks: 98,
      desc: 'Collection of reusable Tailwind CSS components',
    },
    {
      name: 'node-api-boilerplate',
      lang: 'JavaScript',
      stars: 524,
      forks: 87,
      desc: 'RESTful API boilerplate using Node.js and Express',
    },
  ];

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
          {repositories.map((repo, index) => (
            <Card
              key={index}
              className="rounded-lg border bg-background p-4 transition-all duration-300 hover:border-primary hover:shadow-md hover:shadow-primary/20"
            >
              <div className="flex items-start justify-between">
                <h4 className="cursor-pointer text-lg font-medium text-primary transition-colors duration-200 hover:text-primary">
                  {repo.name}
                </h4>
                <span
                  className={`rounded px-2 py-0.5 text-xs ${
                    repo.lang === 'TypeScript'
                      ? 'bg-blue-900 text-blue-300'
                      : repo.lang === 'JavaScript'
                        ? 'bg-yellow-900 text-yellow-300'
                        : 'bg-purple-900 text-purple-300'
                  }`}
                >
                  {repo.lang}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-gray-400">
                {repo.desc}
              </p>
              <div className="mt-4 flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <FaStar className="text-sm" />
                  {repo.stars}
                </div>
                <div className="flex items-center gap-1">
                  <FaCodeBranch className="text-sm" />
                  {repo.forks}
                </div>
                <div className="flex items-center gap-1">
                  <FaEye className="text-sm" />
                  {repo.stars * 5}
                </div>
              </div>
            </Card>
          ))}
        </div>{' '}
        <Button className="w-full">View All Repositories</Button>
      </CardContent>
    </Card>
  );
};

export default Repositories;
