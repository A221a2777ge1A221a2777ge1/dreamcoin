'use server';

/**
 * @fileOverview Provides AI-powered summaries of transaction history for users.
 * This has been updated to reduce verbosity and focus on conciseness, generating shorter summaries.
 *
 * - `getTransactionSummaries` - An asynchronous function that generates a summary of a user's transaction history.
 * - `TransactionSummariesInput` - The input type for the `getTransactionSummaries` function.
 * - `TransactionSummariesOutput` - The output type for the `getTransactionSummaries` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TransactionSummariesInputSchema = z.object({
  userId: z.string().describe('The ID of the user whose transaction history is to be summarized.'),
  transactionHistory: z.string().describe('A stringified JSON array of transaction history records.'),
});
export type TransactionSummariesInput = z.infer<typeof TransactionSummariesInputSchema>;

const TransactionSummariesOutputSchema = z.object({
  summary: z.string().describe('A concise, AI-powered summary of the user transaction history.'),
});
export type TransactionSummariesOutput = z.infer<typeof TransactionSummariesOutputSchema>;

export async function getTransactionSummaries(input: TransactionSummariesInput): Promise<TransactionSummariesOutput> {
  return transactionSummariesFlow(input);
}

const transactionSummariesPrompt = ai.definePrompt({
  name: 'transactionSummariesPrompt',
  input: {schema: TransactionSummariesInputSchema},
  output: {schema: TransactionSummariesOutputSchema},
  prompt: `You are an AI assistant that generates **concise** summaries of user transaction histories for a crypto trading and rewards platform called DreamCoin.

  Given the following transaction history for user {{userId}}, create a **brief** summary of their activity:

  Transaction History:
  {{transactionHistory}}

  Focus on key trends, **significant** transactions, and overall user behavior. Keep the summary **extremely brief** and easy to understand (2-3 sentences max). Do not be verbose. Get straight to the point.
`,
});

const transactionSummariesFlow = ai.defineFlow(
  {
    name: 'transactionSummariesFlow',
    inputSchema: TransactionSummariesInputSchema,
    outputSchema: TransactionSummariesOutputSchema,
  },
  async input => {
    const {output} = await transactionSummariesPrompt(input);
    return output!;
  }
);
