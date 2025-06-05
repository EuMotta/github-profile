/* eslint-disable no-case-declarations */
'use client';
import React from 'react';
import { MdHistory } from 'react-icons/md';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetGithubEvents } from '@/hooks/github-events';

interface GithubEvent {
  id: string;
  type: string;
  repo: { name: string };
  payload: any;
  created_at: string;
}

const eventConfig: Record<string, { label: string; color: string }> = {
  PushEvent: { label: 'Pushed commits to', color: 'text-green-400' },
  IssuesEvent: { label: 'Opened issue in', color: 'text-red-400' },
  PullRequestEvent: { label: 'Created pull request in', color: 'text-purple-400' },
  ForkEvent: { label: 'Forked', color: 'text-blue-400' },
  WatchEvent: { label: 'Starred', color: 'text-yellow-400' },
  CreateEvent: { label: 'Created', color: 'text-indigo-400' },
  DeleteEvent: { label: 'Deleted', color: 'text-gray-400' },
  default: { label: 'Performed action in', color: 'text-muted-foreground' },
};

const getEventDescription = (event: GithubEvent): string => {
  const { type, payload } = event;
  switch (type) {
    case 'PushEvent':
      const commitCount = payload.commits?.length || 0;
      return `${commitCount} commit${commitCount !== 1 ? 's' : ''} pushed`;
    case 'IssuesEvent':
      return `Issue ${payload.action}: ${payload.issue?.title}`;
    case 'PullRequestEvent':
      return `Pull request ${payload.action}: ${payload.pull_request?.title}`;
    case 'ForkEvent':
      return `Forked to ${payload.forkee?.full_name}`;
    case 'WatchEvent':
      return `Starred the repository`;
    case 'CreateEvent':
      return `Created ${payload.ref_type}: ${payload.ref}`;
    case 'DeleteEvent':
      return `Deleted ${payload.ref_type}: ${payload.ref}`;
    default:
      return '';
  }
};

interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => (
  <p className="text-center text-muted-foreground">{message}</p>
);

interface ActivityItemProps {
  event: GithubEvent;
}

const ActivityItem: React.FC<ActivityItemProps> = React.memo(({ event }) => {
  const { label, color } = eventConfig[event.type] || eventConfig.default;

  return (
    <div className="relative">
      <div className="absolute -left-10 mt-1 h-4 w-4 rounded-full border-4 bg-primary" />
      <div className="mb-1 flex items-center gap-2">
        <span className={`text-sm ${color}`}>{label}</span>
        <span className="font-medium text-primary">{event.repo.name}</span>
        <span className="ml-auto text-xs text-muted-foreground">
          {new Date(event.created_at).toLocaleString()}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{getEventDescription(event)}</p>
    </div>
  );
});

ActivityItem.displayName = 'ActivityItem';

interface RecentActivityProps {
  username: string;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ username }) => {
  const { data: events } = useGetGithubEvents(username);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <MdHistory className="text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {events?.length === 0 && <EmptyState message="No recent activity" />}
        <div className="relative space-y-6 border-l pl-6">
          {events?.map((event) => <ActivityItem key={event.id} event={event} />)}
        </div>
        <Button className="mt-6 w-full">View All Activity</Button>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
