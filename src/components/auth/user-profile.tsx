
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useWalletStore } from '@/lib/store/wallet';
import { useRouter } from 'next/navigation';
import { LogOut, Wallet } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { useEffect, useState } from 'react';

export function UserProfile() {
  const { isConnected, address, disconnect } = useWalletStore();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  const handleSignOut = () => {
    disconnect();
    router.push('/connect-wallet');
  };

  const formatAddress = (addr: string | null) => {
    if (!addr) return '...';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  }

  if (!isClient) {
    return <Skeleton className="h-8 w-24 rounded-md" />;
  }

  if (!isConnected) {
    return (
      <Button onClick={() => router.push('/connect-wallet')}>
        Connect Wallet
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="relative h-10 gap-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback>
                <Wallet className="h-4 w-4"/>
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline">{formatAddress(address)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Connected Wallet</p>
            <p className="text-xs leading-none text-muted-foreground">
              {address}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
