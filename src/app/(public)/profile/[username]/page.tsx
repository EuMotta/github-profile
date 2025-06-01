'use client';
import { ThemeApplier } from '@/components/theme';
import Sidebar from '@/templates/sidebar';

import Repositories from '@/templates/home/repositories';
import Followers from '@/templates/home/followers';
import Organizations from '@/templates/home/organizations';
import { ProfileGitProvider } from '@/providers/git-profile';
import { useGetGithubProfile } from '@/hooks/github-profile';
import RecentActivity from '@/templates/home/activity';
import { Response } from '@/components/common/response';

interface Page {
  params: {
    username: string;
  };
}
const Page = ({ params }: Page) => {
  const { data: user, isLoading: isLoadingUser } = useGetGithubProfile(params.username);

  if (!user && !isLoadingUser) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Response image="/stickers/sad.png" title="Oops!" description="User not found" />
      </div>
    );
  }
  return (
    <ProfileGitProvider data={user} isLoading={isLoadingUser}>
      <div className="container mx-auto p-6">
        <ThemeApplier />
        <div className="grid-cols-3 gap-5 lg:grid">
          <div className="col-span-1">
            <Sidebar username={params.username} />
          </div>
          <div className="col-span-2 space-y-5">
            <Repositories username={params.username} />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Followers username={params.username} />

              <Organizations username={params.username} />
            </div>

            <RecentActivity username={params.username} />
          </div>
        </div>
      </div>
    </ProfileGitProvider>
  );
};
export default Page;
