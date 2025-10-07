import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { RewardTier } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { getRewardTierDescriptions } from "@/ai/flows/reward-tier-descriptions";

interface RewardCardProps {
  reward: RewardTier;
}

export async function RewardCard({ reward }: RewardCardProps) {
  const placeholder = PlaceHolderImages.find(p => p.id === `${reward.id}-reward`);
  
  const aiDescription = await getRewardTierDescriptions({
      tierName: reward.name,
      rewardAmount: reward.reward,
      triggerDescription: reward.trigger
  });

  const getStatusBadgeVariant = (status: RewardTier['status']) => {
    switch (status) {
      case 'claimed':
        return 'default';
      case 'unclaimed':
        return 'secondary';
      case 'locked':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center">
        {placeholder && (
          <Image
            src={placeholder.imageUrl}
            alt={reward.name}
            width={100}
            height={100}
            data-ai-hint={placeholder.imageHint}
            className="rounded-full border-4 border-primary/50"
          />
        )}
        <CardTitle className="font-headline text-center mt-2">{reward.name}</CardTitle>
        <Badge variant={getStatusBadgeVariant(reward.status)} className="capitalize mt-1">{reward.status}</Badge>
      </CardHeader>
      <CardContent className="flex-1 text-center">
        <p className="text-sm text-muted-foreground">{aiDescription.description}</p>
        <div className="mt-4">
            <p className="font-bold text-2xl text-primary">{reward.reward} DRC</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        {reward.status !== 'claimed' && (
          <>
            <div className="w-full text-center">
              <Progress value={reward.progress} className="w-full h-2" />
              <span className="text-xs text-muted-foreground">{reward.progress}% complete</span>
            </div>
            <Button className="w-full" disabled={reward.status !== 'unclaimed'}>
              {reward.status === 'unclaimed' ? 'Claim Reward' : 'Locked'}
            </Button>
          </>
        )}
         {reward.status === 'claimed' && (
            <Button className="w-full" variant="outline" disabled>
              Claimed
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}
