import { RewardsGrid } from "@/components/rewards/rewards-grid";
import { Button } from "@/components/ui/button";

export default function RewardsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
       <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Rewards
        </h1>
        <div className="flex items-center space-x-2">
          <Button>Claim All</Button>
        </div>
      </div>
      <p className="text-muted-foreground">
        Earn DreamCoin by engaging with the platform. Claim your rewards below.
      </p>
      <RewardsGrid />
    </div>
  );
}
