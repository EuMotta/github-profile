import { Suspense } from 'react';

import Loading from '@/app/loading';
import { Response } from '@/components/common/response';
import { ThemeApplier } from '@/components/theme';
import { getGithubData } from '@/http/github/server/api';
import { ProfileGitProvider } from '@/providers/git-profile';
import RecentActivity from '@/templates/home/activity';
import Contributions from '@/templates/home/contributions';
import Followers from '@/templates/home/followers';
import Organizations from '@/templates/home/organizations';
import Repositories from '@/templates/home/repositories';
import Sidebar from '@/templates/sidebar';

const UserNotFound: React.FC = () => (
  <div className="flex h-[60vh] items-center justify-center">
    <Response image="/stickers/sad.png" title="Oops!" description="User not found" />
  </div>
);

const ErrorFallback: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex h-[60vh] items-center justify-center">
    <Response image="/stickers/sad.png" title="Error!" description={message} />
  </div>
);

interface PageProps {
  params: {
    username: string;
  };
}

async function UserProfile({ username }: { username: string }) {
  try {
    const user = await getGithubData().findProfileByName(username);

    if (!user) {
      return <UserNotFound />;
    }

    return (
      <ProfileGitProvider data={user} isLoading={false}>
        <div className="container mx-auto p-6">
          <ThemeApplier />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <aside className="col-span-1">
              <Sidebar username={username} />
            </aside>
            <main className="col-span-1 space-y-5 lg:col-span-2">
              <Repositories username={username} />
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Followers username={username} />
                <Organizations username={username} />
              </div>
              <Contributions username={username} />
              <RecentActivity username={username} />
            </main>
          </div>
        </div>
      </ProfileGitProvider>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Something went wrong';
    return <ErrorFallback message={message} />;
  }
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { username } = params;

  return (
    <Suspense fallback={<Loading />}>
      <UserProfile username={username} />
    </Suspense>
  );
};

export default Page;
