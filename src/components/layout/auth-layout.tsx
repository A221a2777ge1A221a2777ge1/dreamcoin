'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import React from 'react';
import { DashboardLayout } from './dashboard-layout';
import { useUser } from '../../firebase/auth/use-user';
import { Skeleton } from '../ui/skeleton';

/**
 * This component handles the authentication state of the user.
 * It ensures that unauthenticated users are redirected to the login page,
 * and authenticated users are redirected away from the login page.
 */
export function AuthLayout({ children }: { children: ReactNode }) {
  const { data: user, isLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    const isAuthPage = pathname === '/login';

    if (!user && !isAuthPage) {
      router.push('/login');
    }

    if (user && isAuthPage) {
      router.push('/');
    }
  }, [user, isLoading, router, pathname]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  const isAuthPage = pathname === '/login';

  if (!user && !isAuthPage) {
    return (
       <div className="flex h-screen w-full items-center justify-center">
        <p>Redirecting to login...</p>
      </div>
    );
  }
  
  if (user && isAuthPage) {
      return (
       <div className="flex h-screen w-full items-center justify-center">
        <p>Redirecting to dashboard...</p>
      </div>
    );
  }
  
  if (isAuthPage) {
    return <>{children}</>;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
