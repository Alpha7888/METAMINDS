'use server';

/**
 * @fileOverview AI flow for automated budgeting and goal setting.
 *
 * - automatedBudgetingAndGoalSetting - A function that helps users create realistic financial goals, suggest specific actions, and track their progress automatically.
 * - AutomatedBudgetingAndGoalSettingInput - The input type for the automatedBudgetingAndGoalSetting function.
 * - AutomatedBudgetingAndGoalSettingOutput - The return type for the automatedBudgetingAndGoalSetting function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomatedBudgetingAndGoalSettingInputSchema = z.object({
  financialSituation: z
    .string()
    .describe('A detailed description of the user\'s current financial situation, including income, expenses, debts, and assets.'),
  financialGoals: z
    .string()
    .describe('A description of the user\'s financial goals, such as saving for a vacation, paying off debt, or investing for retirement.'),
});
export type AutomatedBudgetingAndGoalSettingInput = z.infer<typeof AutomatedBudgetingAndGoalSettingInputSchema>;

const AutomatedBudgetingAndGoalSettingOutputSchema = z.object({
  goalSuggestions: z
    .string()
    .describe('Specific, measurable, achievable, relevant, and time-bound (SMART) financial goals tailored to the user\'s situation.'),
  actionableSteps: z
    .string()
    .describe('A list of actionable steps the user can take to achieve their financial goals, such as creating a budget, reducing expenses, or increasing income.'),
  progressTracking:
    z.string().describe('A plan for how the user can track their progress toward their financial goals, including metrics to monitor and frequency of review.'),
});
export type AutomatedBudgetingAndGoalSettingOutput = z.infer<typeof AutomatedBudgetingAndGoalSettingOutputSchema>;

export async function automatedBudgetingAndGoalSetting(
  input: AutomatedBudgetingAndGoalSettingInput
): Promise<AutomatedBudgetingAndGoalSettingOutput> {
  return automatedBudgetingAndGoalSettingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'automatedBudgetingAndGoalSettingPrompt',
  input: {schema: AutomatedBudgetingAndGoalSettingInputSchema},
  output: {schema: AutomatedBudgetingAndGoalSettingOutputSchema},
  prompt: `You are a financial advisor who specializes in helping people create realistic financial goals and achieve them.

  Based on the user's financial situation and goals, provide specific, measurable, achievable, relevant, and time-bound (SMART) financial goals tailored to the user's situation.

  Suggest a list of actionable steps the user can take to achieve their financial goals, such as creating a budget, reducing expenses, or increasing income.

  Create a plan for how the user can track their progress toward their financial goals, including metrics to monitor and frequency of review.

  Financial Situation: {{{financialSituation}}}
  Financial Goals: {{{financialGoals}}}
  `,
});

const automatedBudgetingAndGoalSettingFlow = ai.defineFlow(
  {
    name: 'automatedBudgetingAndGoalSettingFlow',
    inputSchema: AutomatedBudgetingAndGoalSettingInputSchema,
    outputSchema: AutomatedBudgetingAndGoalSettingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
