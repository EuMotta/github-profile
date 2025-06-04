'use client';
import React from 'react';
import { MdGroup, MdFavorite, MdPersonAdd } from 'react-icons/md';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGetGithubFollowers } from '@/hooks/github-followers';
import { GitFollowers } from '@/@interfaces/github/followers';
import { Skeleton } from '@/components/ui/skeleton';
import { Response } from '@/components/common/response';

const FollowersCard = React.memo(({ follower }: { follower: GitFollowers }) => {
  return (
    <div className="flex items-center gap-3 rounded-lg p-2 transition-colors duration-200 hover:bg-muted">
      <Avatar>
        <AvatarImage src={follower.avatar_url} alt={`@${follower.login}`} />
        <AvatarFallback>{follower.login.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>

      <div>
        <div className="font-medium">@{follower.login}</div>
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
});

const Followers = ({ username }: { username: string }) => {
  const { data, isError, error, isLoading } = useGetGithubFollowers(username);

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
            <Response image="/stickers/sad.png" title="Oops!" description={error.message} />
          )}

          {data?.length === 0 && (
            <Response
              image="/stickers/sad.png"
              title="Oops!"
              description="No public repositories found"
            />
          )}

          {isLoading && Array.from({ length: 4 }, (_, i) => <Skeleton key={i} className="h-10" />)}

          {data?.map((follower, index) => <FollowersCard follower={follower} key={index} />)}

          <Button variant="link" className="mt-2 text-primary">
            View All Followers
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Followers;
