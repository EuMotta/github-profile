import { MdHistory } from 'react-icons/md';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGetGithubEvents } from '@/hooks/github-events';

const RecentActivity = ({ username }: { username: string }) => {
  const { data: events } = useGetGithubEvents(username);
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'PushEvent':
        return 'Pushed commits to';
      case 'IssuesEvent':
        return 'Opened issue in';
      case 'PullRequestEvent':
        return 'Created pull request in';
      case 'ForkEvent':
        return 'Forked';
      case 'WatchEvent':
        return 'Starred';
      case 'CreateEvent':
        return 'Created';
      case 'DeleteEvent':
        return 'Deleted';
      default:
        return 'Performed action in';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'PushEvent':
        return 'text-green-400';
      case 'IssuesEvent':
        return 'text-red-400';
      case 'PullRequestEvent':
        return 'text-purple-400';
      case 'ForkEvent':
        return 'text-blue-400';
      case 'WatchEvent':
        return 'text-yellow-400';
      case 'CreateEvent':
        return 'text-indigo-400';
      case 'DeleteEvent':
        return 'text-gray-400';
      default:
        return 'text-muted-foreground';
    }
  };

  const getEventDescription = (event: any) => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <MdHistory className="text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative space-y-6 border-l pl-6">
          {events?.map((activity, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-10 mt-1 h-4 w-4 rounded-full border-4 bg-primary"></div>
              <div className="mb-1 flex items-center gap-2">
                <span className={`text-sm ${getTypeColor(activity.type)}`}>
                  {getTypeLabel(activity.type)}
                </span>
                <span className="font-medium text-primary">
                  {activity.repo.name}
                </span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {new Date(activity.created_at).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {getEventDescription(activity)}
              </p>
            </div>
          ))}
        </div>
        <Button className="mt-6 w-full">View All Activity</Button>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
