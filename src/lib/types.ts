export type Transaction = {
  id: string;
  type: 'Swap' | 'Reward Claim';
  status: 'Completed' | 'Pending' | 'Failed';
  fromToken?: string;
  toToken?: string;
  fromAmount?: number;
  toAmount?: number;
  rewardTier?: string;
  rewardAmount?: number;
  date: string;
  txHash: string;
};

export type RewardTier = {
  id: string;
  name: string;
  tier: 'Lagos Bonus' | 'Cairo Reward' | 'Nairobi Treasure' | 'Accra Champion';
  trigger: string;
  reward: number;
  status: 'claimed' | 'unclaimed' | 'locked';
  progress?: number;
};
