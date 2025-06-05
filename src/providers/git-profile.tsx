'use client';

import React, { createContext, useContext, ReactNode } from 'react';

import { GitProfile } from '@/http/github/interfaces/profile';

type ProfileGitContextType = {
  data: GitProfile | undefined;
  isLoading: boolean;
  isError?: boolean;
  error?: unknown;
  isSuccess?: boolean;
  refetch?: () => void;
};

const ProfileGitContext = createContext<ProfileGitContextType | undefined>(undefined);

export function useGitProfile(): ProfileGitContextType {
  const context = useContext(ProfileGitContext);
  if (!context) {
    throw new Error('useGitProfile must be used within a ProfileGitProvider');
  }
  return context;
}

type ProfileGitProviderProps = {
  children: ReactNode;
} & ProfileGitContextType;

export function ProfileGitProvider({
  children,
  data,
  isLoading,
  isError,
  error,
  isSuccess,
  refetch,
}: ProfileGitProviderProps) {
  return (
    <ProfileGitContext.Provider value={{ data, isLoading, isError, error, isSuccess, refetch }}>
      {children}
    </ProfileGitContext.Provider>
  );
}
