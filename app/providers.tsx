'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';
import { GuidelinesProvider } from '../contexts/GuidelinesContext';

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <GuidelinesProvider>
        {children}
      </GuidelinesProvider>
    </QueryClientProvider>
  );
}
