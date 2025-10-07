'use server';

/**
 * @fileOverview A Genkit flow for generating engaging, AI-generated descriptions for each reward tier.
 *
 * - getRewardTierDescriptions - A function that generates reward tier descriptions.
 * - RewardTierDescriptionsInput - The input type for the getRewardTierDescriptions function.
 * - RewardTierDescriptionsOutput - The return type for the getRewardTierDescriptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RewardTierDescriptionsInputSchema = z.object({
  tierName: z.string().describe('The name of the reward tier (e.g., Lagos, Cairo, Nairobi, Accra).'),
  rewardAmount: z.number().describe('The amount of DreamCoin awarded for this tier.'),
  triggerDescription: z.string().describe('A short description of the trigger for earning this tier.'),
});
export type RewardTierDescriptionsInput = z.infer<typeof RewardTierDescriptionsInputSchema>;

const RewardTierDescriptionsOutputSchema = z.object({
  description: z.string().describe('An engaging, AI-generated description of the reward tier.'),
});
export type RewardTierDescriptionsOutput = z.infer<typeof RewardTierDescriptionsOutputSchema>;

export async function getRewardTierDescriptions(input: RewardTierDescriptionsInput): Promise<RewardTierDescriptionsOutput> {
  return rewardTierDescriptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rewardTierDescriptionsPrompt',
  input: {schema: RewardTierDescriptionsInputSchema},
  output: {schema: RewardTierDescriptionsOutputSchema},
  prompt: `You are a marketing copywriter specializing in creating engaging descriptions for a Web3 rewards program.

  Generate a short, exciting, and inspiring description for the {{tierName}} reward tier. Include the reward amount and the trigger for earning the reward.

  Tier Name: {{tierName}}
  Reward Amount: {{rewardAmount}} DreamCoin
  Trigger: {{triggerDescription}}`,
});

const rewardTierDescriptionsFlow = ai.defineFlow(
  {
    name: 'rewardTierDescriptionsFlow',
    inputSchema: RewardTierDescriptionsInputSchema,
    outputSchema: RewardTierDescriptionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
