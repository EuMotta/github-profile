import React from 'react';
import { FaCode } from 'react-icons/fa';

import { useGetGithubTopLangs } from '@/hooks/github-top-langs';

const TopLangs = ({ username }: { username: string }) => {
  const { data: langs } = useGetGithubTopLangs(username);
  return (
    <div>
      <div className="mt-8 border-t border-border pt-6">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <FaCode className="text-primary" />
          Languages
        </h3>
        <div className="max-h-96 space-y-3 overflow-auto text-sm">
          {langs?.map((lang, index) => (
            <div key={index} className="flex justify-between">
              <span>{lang.name}</span>
              <span>{lang.percentage}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopLangs;
