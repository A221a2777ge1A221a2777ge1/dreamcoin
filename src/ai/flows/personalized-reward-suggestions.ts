'use server';

/**
 * @fileOverview Personalized reward suggestions AI agent.
 *
 * - personalizedRewardSuggestions - A function that handles the personalized reward suggestions process.
 * - PersonalizedRewardSuggestionsInput - The input type for the personalizedRewardSuggestions function.
 * - PersonalizedRewardSuggestionsOutput - The return type for the personalizedRewardSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRewardSuggestionsInputSchema = z.object({
  walletAddress: z.string().describe('The wallet address of the user.'),
  currentTier: z.string().optional().describe('The user\'s current reward tier (e.g., Lagos, Cairo, Nairobi, Accra).'),
  swapCount: z.number().describe('The number of swaps the user has made.'),
  lastSwapDate: z.string().optional().describe('The date of the user\'s last swap (ISO format).'),
  volumeSwapped: z.number().describe('Total volume swapped by the user in DreamCoin.'),
});
export type PersonalizedRewardSuggestionsInput = z.infer<typeof PersonalizedRewardSuggestionsInputSchema>;

const PersonalizedRewardSuggestionsOutputSchema = z.object({
  suggestedTier: z.string().describe('The suggested next reward tier for the user.'),
  reason: z.string().describe('The reason for suggesting this tier, based on user activity.'),
  motivation: z.string().describe('A motivational message to encourage the user to pursue the suggested tier.'),
});
export type PersonalizedRewardSuggestionsOutput = z.infer<typeof PersonalizedRewardSuggestionsOutputSchema>;

export async function personalizedRewardSuggestions(input: PersonalizedRewardSuggestionsInput): Promise<PersonalizedRewardSuggestionsOutput> {
  return personalizedRewardSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRewardSuggestionsPrompt',
  input: {schema: PersonalizedRewardSuggestionsInputSchema},
  output: {schema: PersonalizedRewardSuggestionsOutputSchema},
  prompt: `You are a personalized reward suggestion agent for the DreamCoin crypto trading and rewards platform. DreamCoin rewards users based on tiers related to engagement.

  Given the user\'s current activity and progress, suggest the next reward tier they should pursue and provide a reason and motivational message.

  User Wallet Address: {{{walletAddress}}}
  Current Tier: {{{currentTier}}}
  Swap Count: {{{swapCount}}}
  Last Swap Date: {{{lastSwapDate}}}
  Volume Swapped: {{{volumeSwapped}}}

  Consider these reward tiers:
  - Lagos Bonus: First wallet connection
  - Cairo Reward: First token swap
  - Nairobi Treasure: 3+ swaps per week
  - Accra Champion: Top 10 monthly volume

  Suggest the most appropriate next tier and provide a personalized reason and motivational message.
  Output should be JSON. Make sure to use double quotes.
  For example:
  {
    "suggestedTier": "Nairobi Treasure",
    "reason": "You have made 2 swaps this week, complete 3+ swaps to earn this reward.",
    "motivation": "Keep swapping to unlock the Nairobi Treasure and earn 50 DreamCoin!"
  }
  `,
});

const personalizedRewardSuggestionsFlow = ai.defineFlow(
  {
    name: 'personalizedRewardSuggestionsFlow',
    inputSchema: PersonalizedRewardSuggestionsInputSchema,
    outputSchema: PersonalizedRewardSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
