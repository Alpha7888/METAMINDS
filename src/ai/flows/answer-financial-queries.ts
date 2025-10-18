'use server';

/**
 * @fileOverview An AI agent that answers user questions about their finances.
 *
 * - answerFinancialQuery - A function that answers financial queries.
 * - AnswerFinancialQueryInput - The input type for the answerFinancialQuery function.
 * - AnswerFinancialQueryOutput - The return type for the answerFinancialQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerFinancialQueryInputSchema = z.object({
  query: z.string().describe('The user query about their finances.'),
  financialSummary: z.string().describe('A summary of the user\'s financial situation, including income, expenses, debts, and assets.'),
});
export type AnswerFinancialQueryInput = z.infer<typeof AnswerFinancialQueryInputSchema>;

const AnswerFinancialQueryOutputSchema = z.object({
  answer: z.string().describe('The answer to the user\'s query.'),
});
export type AnswerFinancialQueryOutput = z.infer<typeof AnswerFinancialQueryOutputSchema>;

export async function answerFinancialQuery(input: AnswerFinancialQueryInput): Promise<AnswerFinancialQueryOutput> {
  return answerFinancialQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerFinancialQueryPrompt',
  input: {schema: AnswerFinancialQueryInputSchema},
  output: {schema: AnswerFinancialQueryOutputSchema},
  prompt: `You are a friendly and helpful personal finance assistant called Finara.

Your goal is to provide clear, concise, and easy-to-understand answers to the user's financial questions.

Use the provided financial summary to answer the user's question. Analyze the data and perform calculations if necessary.

When presenting numbers, format them clearly (e.g., using commas for thousands and specifying the currency as INR or ₹).

If the answer is in the data, provide it directly. If the question requires a calculation, explain the calculation. If the data is insufficient to answer the question, state that you don't have enough information and specify what is missing.

Financial Summary:
{{{financialSummary}}}

Question: {{query}}

Answer: `,
});

const answerFinancialQueryFlow = ai.defineFlow(
  {
    name: 'answerFinancialQueryFlow',
    inputSchema: AnswerFinancialQueryInputSchema,
    outputSchema: AnswerFinancialQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
