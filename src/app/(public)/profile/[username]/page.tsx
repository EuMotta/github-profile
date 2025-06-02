'use client';
import { ThemeApplier } from '@/components/theme';
import { Response } from '@/components/common/response';
import { ProfileGitProvider } from '@/providers/git-profile';
import { useGetGithubProfile } from '@/hooks/github-profile';
import Sidebar from '@/templates/sidebar';
import Repositories from '@/templates/home/repositories';
import Followers from '@/templates/home/followers';
import Organizations from '@/templates/home/organizations';
import RecentActivity from '@/templates/home/activity';
import Loading from '@/app/loading';
import Contributions from '@/templates/home/contributions';

interface PageProps {
  params: {
    username: string;
  };
}

const UserNotFound: React.FC = () => (
  <div className="flex h-[60vh] items-center justify-center">
    <Response image="/stickers/sad.png" title="Oops!" description="User not found" />
  </div>
);

const Page: React.FC<PageProps> = ({ params }) => {
  const { username } = params;
  const { data: user, isLoading: isLoadingUser } = useGetGithubProfile(username);

  if (!user && !isLoadingUser) {
    return <UserNotFound />;
  }

  if (isLoadingUser) {
    return <Loading />;
  }

  return (
    <ProfileGitProvider data={user} isLoading={isLoadingUser}>
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
};

export default Page;
