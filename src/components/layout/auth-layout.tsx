
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { useUser } from '@/firebase';
import { DashboardLayout } from './dashboard-layout';

/**
 * This component handles the authentication state of the user.
 * It ensures that unauthenticated users are redirected to the login page,
 * and authenticated users are redirected away from the login page.
 */
export function AuthLayout({ children }: { children: ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Wait for the authentication state to be determined
    if (isUserLoading) {
      return;
    }

    const isAuthPage = pathname === '/login';

    // If the user is not authenticated, and they are not on the login page,
    // redirect them to the login page.
    if (!user && !isAuthPage) {
      router.push('/login');
    }

    // If the user is authenticated and they are on the login page,
    // redirect them to the dashboard.
    if (user && isAuthPage) {
      router.push('/');
    }
  }, [user, isUserLoading, router, pathname]);

  // While the auth state is loading, we can show a loader
  if (isUserLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  const isAuthPage = pathname === '/login';

  // Prevent flash of content:
  // If user is not logged in and not on auth page, show loader while redirecting
  if (!user && !isAuthPage) {
    return (
       <div className="flex h-screen w-full items-center justify-center">
        <p>Redirecting to login...</p>
      </div>
    );
  }
  
  // If user is logged in and on auth page, show loader while redirecting
  if (user && isAuthPage) {
      return (
       <div className="flex h-screen w-full items-center justify-center">
        <p>Redirecting to dashboard...</p>
      </div>
    );
  }
  
  // If it's an auth page, just render the children without the dashboard layout
  if (isAuthPage) {
    return <>{children}</>;
  }

  // For all other pages, wrap with the main DashboardLayout
  return <DashboardLayout>{children}</DashboardLayout>;
}
