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
  params: { username: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const componentMap: Record<string, { component: React.FC<{ username: string }>; grid?: string }> = {
  repositories: { component: Repositories },
  followers: { component: Followers, grid: 'md:grid-cols-2' },
  organizations: { component: Organizations, grid: 'md:grid-cols-2' },
  contributions: { component: Contributions },
  recentActivity: { component: RecentActivity },
};

const getVisibleComponents = (componentsParam: string | undefined) => {
  if (!componentsParam) {
    return Object.keys(componentMap);
  }
  return componentsParam
    .split(',')
    .map((comp) => comp.trim())
    .filter((comp) => comp in componentMap);
};

async function UserProfile({
  username,
  searchParams,
}: {
  username: string;
  searchParams: PageProps['searchParams'];
}) {
  try {
    const user = await getGithubData().findProfileByName(username);

    if (!user) {
      return <UserNotFound />;
    }

    const componentsParam =
      typeof searchParams.components === 'string' ? searchParams.components : undefined;
    const visibleComponents = getVisibleComponents(componentsParam);

    return (
      <ProfileGitProvider data={user} isLoading={false}>
        <div className="container mx-auto p-6">
          <ThemeApplier />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <aside className="col-span-1">
              <Sidebar username={username} />
            </aside>
            <main className="col-span-1 space-y-5 lg:col-span-2">
              <ShowComponent name="repositories" visibleComponents={visibleComponents}>
                <Repositories username={username} />
              </ShowComponent>
              <div className={`grid grid-cols-1 gap-5 ${componentMap.followers.grid || ''}`}>
                {visibleComponents.includes('followers') && <Followers username={username} />}
                {visibleComponents.includes('organizations') && (
                  <Organizations username={username} />
                )}
              </div>
              {visibleComponents.includes('contributions') && <Contributions username={username} />}
              {visibleComponents.includes('recentActivity') && (
                <RecentActivity username={username} />
              )}
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

const Page: React.FC<PageProps> = async ({ params, searchParams }) => {
  const { username } = params;

  return (
    <Suspense fallback={<Loading />}>
      <UserProfile username={username} searchParams={searchParams} />
    </Suspense>
  );
};

function ShowComponent({
  children,
  name,
  visibleComponents,
}: {
  children: React.ReactNode;
  name: string;
  visibleComponents: string[];
}) {
  if (!visibleComponents.includes(name)) return null;
  return <>{children}</>;
}

export default Page;
