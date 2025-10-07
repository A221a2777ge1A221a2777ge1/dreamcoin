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
import { useUser } from "@/firebase";

export function PersonalizedSuggestion() {
  const [suggestion, setSuggestion] = useState<PersonalizedRewardSuggestionsOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const { isConnected: isWalletConnected, address } = useWalletStore();
  const { data: user } = useUser();
  const router = useRouter();

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
      <Card className="h-full flex flex-col items-center justify-center text-center">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-3 rounded-full"><Lightbulb className="w-8 h-8 text-primary" /></div>
          <CardTitle className="font-headline mt-4">Welcome to DreamCoin</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Please sign in to see personalized tips and your next reward!</p>
          <Button className="mt-4" onClick={() => router.push('/login')}>Sign In</Button>
        </CardContent>
      </Card>
    );
  }

  if (!isWalletConnected) {
    return (
     <Card className="h-full flex flex-col items-center justify-center text-center">
       <CardHeader>
         <div className="mx-auto bg-primary/10 p-3 rounded-full"><Wallet className="w-8 h-8 text-primary" /></div>
         <CardTitle className="font-headline mt-4">Connect Your Wallet</CardTitle>
       </CardHeader>
       <CardContent>
         <p className="text-muted-foreground">Connect your wallet to get personalized reward suggestions based on your activity.</p>
         {/* The button to connect is in the UserProfile component */}
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
