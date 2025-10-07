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
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuth, useUser } from '../../firebase/provider';
import { useRouter } from 'next/navigation';
import { LogOut, User, Wallet } from 'lucide-react';
import { useWalletStore } from '@/lib/store/wallet';
import { useToast } from '@/hooks/use-toast';

declare global {
    interface Window {
        ethereum?: any;
    }
}

export function UserProfile() {
  const auth = useAuth();
  const { data: user } = useUser();
  const router = useRouter();
  const { connect, disconnect, isConnected, address } = useWalletStore();
  const { toast } = useToast();

  const handleSignOut = async () => {
    if (auth) {
      await auth.signOut();
      if (isConnected) {
        disconnect();
      }
      router.push('/login');
    }
  };
  
  const handleConnectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
        toast({
            variant: "destructive",
            title: "MetaMask Not Found",
            description: "Please install the MetaMask extension to connect your wallet.",
        });
        return;
    }

    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const walletAddress = accounts[0];
        const chainId = parseInt(window.ethereum.chainId, 16);

        // Mock balances for now
        const bnbBalance = (Math.random() * 5).toFixed(4);
        const dreamCoinBalance = (Math.random() * 10000).toFixed(2);
      
        connect({ address: walletAddress, chainId, bnbBalance, dreamCoinBalance });
        
        toast({
            title: "Wallet Connected",
            description: `Connected to address: ${walletAddress.substring(0,6)}...${walletAddress.substring(walletAddress.length - 4)}`,
        });

    } catch (error: any) {
        console.error('MetaMask sign-in error:', error);
        toast({
            variant: "destructive",
            title: "Connection Failed",
            description: error.message || 'Could not connect to MetaMask. Please try again.',
        });
    }
  };

  const formatAddress = (addr: string | null) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  }

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-8 w-8">
            {user?.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />}
            <AvatarFallback>
                <User className="h-4 w-4"/>
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isConnected ? (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Connected Wallet</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {formatAddress(address)}
                </p>
              </div>
            </DropdownMenuLabel>
             <DropdownMenuItem onClick={disconnect}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Disconnect Wallet</span>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem onClick={handleConnectWallet}>
            <Wallet className="mr-2 h-4 w-4" />
            <span>Connect Wallet</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
