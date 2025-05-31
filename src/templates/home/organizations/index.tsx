import { MdFavorite } from 'react-icons/md';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { gitMock } from '@/constants/github';
import { useGetGithubOrgs } from '@/hooks/github-orgs';
import { useParams } from 'next/navigation';

type Org = (typeof gitMock.orgs)[0];

const OrganizationCard = ({ org }: { org: Org }) => {
  return (
    <Card
      key={org.id}
      className="rounded-lg border bg-background p-4 transition-all duration-300 hover:border-primary hover:shadow-md hover:shadow-primary/20"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={org.avatar_url}
            alt={org.login}
            className="h-10 w-10 rounded-md object-cover"
          />
          <a
            href={org.url}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-lg font-medium text-primary transition-colors duration-200 hover:underline"
          >
            {org.login}
          </a>
        </div>
      </div>

      <p className="mt-2 line-clamp-2 text-sm text-gray-400">
        {org.description || 'Sem descrição disponível.'}
      </p>

      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <a
          href={org.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Ver Organização →
        </a>
      </div>
    </Card>
  );
};

const Organizations = ({ username }: { username: string }) => {
  const { data } = useGetGithubOrgs(username);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <MdFavorite className="text-primary" />
          Organizations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-96 space-y-4 overflow-auto">
          {data?.map((org, index) => (
            <OrganizationCard key={index} org={org} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
export default Organizations;
