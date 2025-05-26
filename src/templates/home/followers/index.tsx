import React from 'react';
import { MdGroup, MdFavorite, MdPersonAdd } from 'react-icons/md';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { gitMock } from '@/constants/github';
import { useGetGithubFollowers } from '@/hooks/github-followers';
import { useParams } from 'next/navigation';

const Followers = () => {
  const params = useParams();
  const { data } = useGetGithubFollowers(params.username);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-xl font-semibold">
          <div className="flex items-center gap-2">
            <MdGroup className="text-primary" />
            Followers
          </div>
          {gitMock.user.followers}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {data?.map((follower, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-lg p-2 transition-colors duration-200 hover:bg-muted"
            >
              <Avatar>
                <AvatarImage src={follower.avatar_url} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
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
          ))}
          <Button variant="link" className="mt-2 text-primary">
            View All Followers
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Followers;
