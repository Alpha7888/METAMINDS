'use server';
/**
 * @fileOverview AI flow for providing proactive financial insights and advice to users.
 *
 * - proactiveFinancialInsights - A function that generates personalized financial insights.
 * - ProactiveFinancialInsightsInput - The input type for the proactiveFinancialInsights function.
 * - ProactiveFinancialInsightsOutput - The return type for the proactiveFinancialInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProactiveFinancialInsightsInputSchema = z.object({
  financialSummary: z
    .string()
    .describe(
      'A detailed summary of the user\'s financial situation, including income, expenses, debts, and assets.'
    ),
  spendingTrends: z
    .string()
    .describe('A summary of the user\'s recent spending trends.'),
  financialGoals: z
    .string()
    .optional()
    .describe('The user\'s stated financial goals, if any.'),
});
export type ProactiveFinancialInsightsInput = z.infer<
  typeof ProactiveFinancialInsightsInputSchema
>;

const ProactiveFinancialInsightsOutputSchema = z.object({
  insights: z
    .array(z.string())
    .describe(
      'A list of proactive financial insights and advice tailored to the user\'s situation.'
    ),
});
export type ProactiveFinancialInsightsOutput = z.infer<
  typeof ProactiveFinancialInsightsOutputSchema
>;

export async function proactiveFinancialInsights(
  input: ProactiveFinancialInsightsInput
): Promise<ProactiveFinancialInsightsOutput> {
  return proactiveFinancialInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'proactiveFinancialInsightsPrompt',
  input: {schema: ProactiveFinancialInsightsInputSchema},
  output: {schema: ProactiveFinancialInsightsOutputSchema},
  prompt: `You are an AI financial advisor who proactively provides personalized financial advice to users based on their financial situation, spending trends, and goals.\n\nFinancial Summary: {{{financialSummary}}}\nSpending Trends: {{{spendingTrends}}}\nFinancial Goals: {{{financialGoals}}}\n\nBased on this information, provide a list of actionable insights and advice to help the user improve their financial health. Focus on potential areas for improvement and opportunities to optimize their finances. Each insight should be no more than 2 sentences.
\nHere's an example of the output:
{
  "insights": [
    "Based on your spending trends, you are spending a significant amount on restaurants. Consider reducing your restaurant spending by 10% to increase your savings.",
    "You have a high balance on your credit card. Consider paying it off to reduce interest charges.",
    "You have not set any financial goals. Consider setting some goals to stay motivated.",
  ]
}
\nReturn the output in JSON format.
`,
});

const proactiveFinancialInsightsFlow = ai.defineFlow(
  {
    name: 'proactiveFinancialInsightsFlow',
    inputSchema: ProactiveFinancialInsightsInputSchema,
    outputSchema: ProactiveFinancialInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
