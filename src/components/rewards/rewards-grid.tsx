import { RewardCard } from "./reward-card";
import { userRewards } from "@/lib/data";

export async function RewardsGrid() {
  const rewards = userRewards;

  return (
    <div className="grid gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {rewards.map((reward) => (
        <RewardCard key={reward.id} reward={reward} />
      ))}
    </div>
  );
}
