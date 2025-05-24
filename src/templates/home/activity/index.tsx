import { MdHistory } from 'react-icons/md';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const RecentActivity = () => {
  const activities = [
    {
      type: 'commit',
      repo: 'next-ai-starter',
      time: '2 hours ago',
      message: 'Fix authentication middleware',
    },
    {
      type: 'issue',
      repo: 'react-data-grid',
      time: '1 day ago',
      message: 'Reported bug in column resizing',
    },
    {
      type: 'pr',
      repo: 'tailwind-components',
      time: '3 days ago',
      message: 'Added new card components',
    },
    {
      type: 'star',
      repo: 'awesome-typescript',
      time: '1 week ago',
      message: 'Starred repository',
    },
  ];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'commit':
        return 'Pushed commit to';
      case 'issue':
        return 'Opened issue in';
      case 'pr':
        return 'Created pull request in';
      default:
        return 'Starred';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'commit':
        return 'text-green-400';
      case 'issue':
        return 'text-red-400';
      case 'pr':
        return 'text-purple-400';
      default:
        return 'text-yellow-400';
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
          {activities.map((activity, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-10 mt-1 h-4 w-4 rounded-full border-4 bg-primary"></div>
              <div className="mb-1 flex items-center gap-2">
                <span className={`text-sm ${getTypeColor(activity.type)}`}>
                  {getTypeLabel(activity.type)}
                </span>
                <span className="font-medium text-primary">
                  {activity.repo}
                </span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {activity.message}
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
