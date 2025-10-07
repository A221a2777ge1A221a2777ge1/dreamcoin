'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, Wallet } from 'lucide-react';
import { useWalletStore } from '@/lib/store/wallet';
import { useToast } from '@/hooks/use-toast';

declare global {
    interface Window {
        ethereum?: any;
    }
}

function MetaMaskSignInButton() {
  const { connect } = useWalletStore();
  const router = useRouter();
  const { toast } = useToast();

  const handleSignIn = async () => {
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
        const address = accounts[0];
        const chainId = parseInt(window.ethereum.chainId, 16);

        // Mock balances for now
        const bnbBalance = (Math.random() * 5).toFixed(4);
        const dreamCoinBalance = (Math.random() * 10000).toFixed(2);
      
        connect({ address, chainId, bnbBalance, dreamCoinBalance });
        
        toast({
            title: "Wallet Connected",
            description: `Connected to address: ${address.substring(0,6)}...${address.substring(address.length - 4)}`,
        });

        router.push('/');

    } catch (error: any) {
        console.error('MetaMask sign-in error:', error);
        toast({
            variant: "destructive",
            title: "Connection Failed",
            description: error.message || 'Could not connect to MetaMask. Please try again.',
        });
    }
  };

  return (
    <Button onClick={handleSignIn} className="w-full gap-2">
      <Wallet className="h-5 w-5" />
      Connect with MetaMask
    </Button>
  );
}


export default function ConnectWalletPage() {
  return (
    <div className="flex-1 flex items-center justify-center bg-background p-4 african-pattern">
      <Card className="w-full max-w-sm bg-card/80 backdrop-blur-sm border-primary/50">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Palette className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="font-headline text-2xl">Welcome to DreamCoin</CardTitle>
          <CardDescription>Connect your wallet to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <MetaMaskSignInButton />
        </CardContent>
      </Card>
    </div>
  );
}
