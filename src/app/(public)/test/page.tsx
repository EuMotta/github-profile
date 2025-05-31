'use client'
import { useGetGithubProfile } from '@/hooks/github-profile';
import React from 'react';

const page = () => {
  const { data: user, isLoading: isLoadingUser } =
    useGetGithubProfile('eumotta');
  return <div>{user?.login}</div>;
};

export default page;
