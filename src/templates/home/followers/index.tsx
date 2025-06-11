'use client';
import Link from 'next/link';
import React from 'react';
import { MdGroup, MdFavorite, MdPersonAdd } from 'react-icons/md';

import { GitFollowers } from '@/@interfaces/github/followers';
import { Response } from '@/components/common/response';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetGithubFollowers } from '@/hooks/github-followers';

const FollowersCard = React.memo(
  ({ follower: { avatar_url = '', login = 'undefined' } }: { follower: GitFollowers }) => {
    return (
      <div className="flex items-center gap-3 rounded-lg p-2 transition-colors duration-200 hover:bg-muted">
        <Avatar>
          <AvatarImage src={avatar_url} alt={`@${login}`} />
          <AvatarFallback>{login.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div>
          <Link href={`/profile/${login}`} className="font-medium">
            @{login}
          </Link>
        </div>

        <Button
          size="icon"
          variant="ghost"
          className="ml-auto hover:bg-primary hover:text-primary-foreground"
        >
          <MdPersonAdd size={16} />
        </Button>
      </div>
    );
  },
);

FollowersCard.displayName = 'FollowersCard';

const Followers = ({ username }: { username: string }) => {
  const { data, isError, error, isLoading, refetch } = useGetGithubFollowers(username);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-xl font-semibold">
          <div className="flex items-center gap-2">
            <MdGroup className="text-primary" />
            Followers
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-4">
          {isError && (
            <>
              <Response
                image="/stickers/sad.png"
                title="Oops!"
                description="Failed to load followers."
                buttonText="retry"
                onButtonClick={() => refetch()}
              />
            </>
          )}

          {data?.length === 0 && (
            <Response
              image="/stickers/sad.png"
              title="No Followers"
              description="This user has no followers yet."
            />
          )}

          {isLoading && Array.from({ length: 4 }, (_, i) => <Skeleton key={i} className="h-10" />)}

          {data?.map((follower, index) => <FollowersCard follower={follower} key={index} />)}

          <Button variant="link" href={'/'} className="mt-2 text-primary">
            View All Followers
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Followers;
