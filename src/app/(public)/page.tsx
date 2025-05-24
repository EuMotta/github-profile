import {
  FaCode,
  FaCodeBranch,
  FaEye,
  FaFilter,
  FaSearch,
  FaStar,
} from 'react-icons/fa';

import ColorSection from '@/components/color-section';
import { ThemeApplier } from '@/components/theme';
import Sidebar from '@/templates/sidebar';
import { ThemeToggle } from '@/components/ui/theme-button';

import Repositories from '@/templates/home/repositories';
import Followers from '@/templates/home/followers';
import Organizations from '@/templates/home/organizations';
import RecentActivity from '@/templates/home/activity';

const Page = () => {
  return (
    <div className="container mx-auto p-6">
      <ThemeApplier />

      <div className="grid-cols-3 gap-5 lg:grid">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-2 space-y-5">
          <Repositories />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Followers />

            <Organizations />
          </div>

          <RecentActivity />
        </div>
      </div>

      <div className="mt-8 border-t pt-6">
        <h3 className="mb-4 text-center text-lg font-semibold">Tech Stack</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            'React',
            'TypeScript',
            'Node.js',
            'MongoDB',
            'GraphQL',
            'Tailwind CSS',
            'Next.js',
            'Docker',
          ].map((tech, index) => (
            <div
              key={index}
              className="rounded-full border bg-card px-4 py-2 text-sm font-medium transition-all duration-300 hover:border-primary hover:bg-gray-700"
            >
              {tech}
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-gray-500">
          Member since 2018 • Last updated May 2023
        </p>
      </div>
    </div>
  );
};
export default Page;
