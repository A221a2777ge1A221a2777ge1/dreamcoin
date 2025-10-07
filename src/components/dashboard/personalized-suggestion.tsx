"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Wallet } from "lucide-react";
import { personalizedRewardSuggestions, PersonalizedRewardSuggestionsOutput } from "@/ai/flows/personalized-reward-suggestions";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { userTransactions } from "@/lib/data";
import { useWalletStore } from "@/lib/store/wallet";
import { useRouter } from "next/navigation";
import { useUser } from "../../firebase/auth/use-user";
import { useToast } from "@/hooks/use-toast";

export function PersonalizedSuggestion() {
  const [suggestion, setSuggestion] = useState<PersonalizedRewardSuggestionsOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const { isConnected: isWalletConnected, address, connect } = useWalletStore();
  const { data: user } = useUser();
  const router = useRouter();
  const { toast } = useToast();

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

  useEffect(() => {
    const fetchSuggestion = async () => {
      if (user && address) {
        setLoading(true);
        try {
          const swapCount = userTransactions.filter(t => t.type === 'Swap').length;
          const lastSwap = userTransactions.find(t => t.type === 'Swap');

          const result = await personalizedRewardSuggestions({
            walletAddress: address,
            currentTier: "Cairo Reward", // Mocked
            swapCount: swapCount,
            lastSwapDate: lastSwap?.date,
            volumeSwapped: 1300, // Mocked
          });
          setSuggestion(result);
        } catch (error) {
          console.error("Error fetching personalized suggestion:", error);
          setSuggestion(null);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchSuggestion();
  }, [user, address]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-10 w-32 mt-2" />
        </CardContent>
      </Card>
    );
  }

  if (!user) {
     return (
      <Card className="h-full flex flex-col items-center justify-center text-center p-4 sm:p-6">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-3 rounded-full"><Lightbulb className="w-8 h-8 text-primary" /></div>
          <CardTitle className="font-headline mt-4">Welcome to DreamCoin</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">Please sign in to see personalized tips and your next reward!</p>
          <Button onClick={() => router.push('/login')}>Sign In</Button>
        </CardContent>
      </Card>
    );
  }

  if (!isWalletConnected) {
    return (
     <Card className="h-full flex flex-col items-center justify-center text-center p-4 sm:p-6">
       <CardHeader>
         <div className="mx-auto bg-primary/10 p-3 rounded-full"><Wallet className="w-8 h-8 text-primary" /></div>
         <CardTitle className="font-headline mt-4">Connect Your Wallet</CardTitle>
       </CardHeader>
       <CardContent className="w-full max-w-xs">
         <p className="text-muted-foreground mb-4">Connect your wallet to get personalized reward suggestions based on your activity.</p>
         <Button onClick={handleConnectWallet} className="w-full gap-2">
            <Wallet className="h-5 w-5" />
            Connect with MetaMask
         </Button>
       </CardContent>
     </Card>
   );
  }

  if (!suggestion) {
    return null; // Or show an error state
  }

  return (
    <Card className="bg-card border-2 border-primary/50 shadow-lg shadow-primary/10">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
            <div>
                <CardTitle className="font-headline text-2xl">Your Next Step: {suggestion.suggestedTier}</CardTitle>
                <CardDescription className="text-base">{suggestion.reason}</CardDescription>
            </div>
            <Lightbulb className="w-8 h-8 text-primary flex-shrink-0" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{suggestion.motivation}</p>
        <Button asChild>
          <Link href="/rewards">View Rewards</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
