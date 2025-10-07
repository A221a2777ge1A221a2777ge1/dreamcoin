
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import React from 'react';
import { DashboardLayout } from './dashboard-layout';
import { useWalletStore } from '@/lib/store/wallet';

/**
 * This component handles the authentication state of the user.
 * It ensures that unauthenticated users are redirected to the login page,
 * and authenticated users are redirected away from the login page.
 */
export function AuthLayout({ children }: { children: ReactNode }) {
  const { isConnected } = useWalletStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = React.useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const isAuthPage = pathname === '/connect-wallet';

    if (!isConnected && !isAuthPage) {
      router.push('/connect-wallet');
    }

    if (isConnected && isAuthPage) {
      router.push('/');
    }
  }, [isConnected, isClient, router, pathname]);

  if (!isClient) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  const isAuthPage = pathname === '/connect-wallet';

  if (!isConnected && !isAuthPage) {
    return (
       <div className="flex h-screen w-full items-center justify-center">
        <p>Redirecting to connect wallet...</p>
      </div>
    );
  }
  
  if (isConnected && isAuthPage) {
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
