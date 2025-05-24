import React from 'react';
import { MdGroup, MdFavorite, MdPersonAdd } from 'react-icons/md';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Followers = () => {
  const followers = [
    {
      name: 'Sarah Johnson',
      username: 'sarahj',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    },
    {
      name: 'Mike Chen',
      username: 'mikedev',
      avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
    },
    {
      name: 'Lisa Patel',
      username: 'lisacodes',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <MdGroup className="text-primary" />
          Top Followers
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {followers.map((follower, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-lg p-2 transition-colors duration-200 hover:bg-muted"
            >
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{follower.name}</div>
                <div className="text-sm text-muted-foreground">
                  @{follower.username}
                </div>
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
