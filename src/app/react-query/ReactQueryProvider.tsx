// ReactQueryProvider.tsx
"use client";
import React, { FC, ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './queryClient';

interface ReactQueryProviderProps {
  children: ReactNode;
}

const ReactQueryProvider: FC<ReactQueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
