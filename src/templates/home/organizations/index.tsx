'use client';
import React from 'react';
import { MdFavorite } from 'react-icons/md';

import { Organization } from '@/@interfaces/github/organization';
import { Response } from '@/components/common/response';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetGithubOrgs } from '@/hooks/github-orgs';

interface OrganizationCardProps {
  org: Organization;
}

const OrganizationCard: React.FC<OrganizationCardProps> = React.memo(({ org }) => (
  <Card className="rounded-lg border bg-background p-4 transition-all duration-300 hover:border-primary hover:shadow-md hover:shadow-primary/20">
    <CardHeader className="p-0">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={org.avatar_url}
            alt={`${org.login} avatar`}
            className="h-10 w-10 rounded-md object-cover"
          />
          <a
            href={org.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-medium text-primary transition-colors duration-200 hover:underline"
          >
            {org.login}
          </a>
        </div>
      </div>
    </CardHeader>
    <CardContent className="p-0">
      <p className="mt-2 line-clamp-2 text-sm text-gray-400">
        {org.description || 'No description available.'}
      </p>
      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <a href={org.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
          View Organization →
        </a>
      </div>
    </CardContent>
  </Card>
));

OrganizationCard.displayName = 'OrganizationCard';

interface OrganizationsProps {
  username: string;
}

const Organizations: React.FC<OrganizationsProps> = ({ username }) => {
  const { data: organizations, isLoading, isError, error } = useGetGithubOrgs(username);

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
          {isError && (
            <Response image="/stickers/sad.png" title="Oops!" description={error.message} />
          )}

          {isLoading && Array.from({ length: 2 }, (_, i) => <Skeleton key={i} className="h-32" />)}

          {organizations?.length === 0 && (
            <Response
              image="/stickers/sad.png"
              title="Oops!"
              description="No organizations found"
            />
          )}
          {organizations?.map((org) => <OrganizationCard key={org.id} org={org} />)}
        </div>
      </CardContent>
    </Card>
  );
};

export default Organizations;
