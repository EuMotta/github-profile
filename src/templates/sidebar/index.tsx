'use client';
import React from 'react';
import { FaMapMarkerAlt, FaLink, FaEye, FaPlus, FaChartBar, FaCalendarAlt } from 'react-icons/fa';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useGitProfile } from '@/providers/git-profile';
import { MdSecurity } from 'react-icons/md';
import { formatDateToPtBR } from '@/utils/datetime';
import { GitCard, GitCardContent } from '@/components/ui/git-card';
import { useSearchParams } from 'next/navigation';
import TopLangs from './top-langs';
import Rank from './rank';

const Sidebar = ({ username }: { username: string }) => {
  const { data: user, isLoading } = useGitProfile();
  const params = useSearchParams();
  const cardstyle = params.get('card');
  return (
    <GitCard>
      <GitCardContent className="p-5">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-primary transition-all duration-300 hover:scale-105">
              <img
                src={user?.avatar_url}
                alt="GitHub Profile"
                className="h-full w-full object-cover"
              />
            </div>
            {user?.site_admin && (
              <div className="absolute -bottom-2 -right-2 rounded-full bg-secondary p-2 text-green-400">
                <MdSecurity className="text-primary" />
              </div>
            )}
          </div>

          <h1 className="mt-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-2xl font-bold tracking-tight text-transparent">
            @{user?.login || 'indefinido'}
          </h1>
          <h2 className="mt-1 text-xl font-medium">{user?.name}</h2>

          <div className="mt-3 space-y-1 text-center">
            <p className="italic text-muted-foreground">{user?.bio}</p>
            <p className="mt-2 flex items-center justify-center gap-1 text-muted-foreground">
              <FaMapMarkerAlt className="text-sm" />
              {user?.location}
            </p>
            <p className="flex items-center justify-center gap-1 text-muted-foreground">
              <FaLink className="text-sm" />
              <a
                rel="noopener noreferrer"
                href={user?.blog}
                className="text-primary transition-colors duration-200 hover:text-primary/80"
              >
                {user?.blog}
              </a>
            </p>
          </div>

          <div className="mt-6 grid w-full grid-cols-2 gap-4">
            <Button href={user?.html_url} target="_blank">
              <FaEye />
              View Profile
            </Button>
            <Button href={user?.html_url} target="_blank">
              <FaPlus />
              Follow
            </Button>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <FaChartBar className="text-primary" />
            Stats Overview
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Repositories', value: user?.public_repos },
              { label: 'Followers', value: user?.followers },
              { label: 'Following', value: user?.following },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-lg bg-accent p-3 transition-colors duration-200 hover:bg-accent/80"
              >
                <div className="text-2xl font-bold text-secondary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <FaCalendarAlt className="text-primary" />
            Account Info
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Member since</span>
              <span>
                {formatDateToPtBR(user?.created_at, {
                  formatStyle: 'custom',
                  includeTime: false,
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Account type</span>
              <Badge>{user?.type}</Badge>
            </div>
          </div>
        </div>
        <TopLangs username={username}/>
        <Rank username={username}/>
      </GitCardContent>
    </GitCard>
  );
};

export default Sidebar;
