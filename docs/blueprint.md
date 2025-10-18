# **App Name**: Finara AI

## Core Features:

- Secure Authentication & Onboarding: Utilize Firebase Authentication (Email/Password, Google, Apple Sign-In) with MFA. Securely link bank accounts/cards via Plaid, encrypting data in transit/rest.
- Intelligent Financial Dashboard: Visualize net worth, spending breakdown, cash flow, and upcoming bills. Display a personalized Financial Health Score calculated from key financial metrics.
- Conversational AI Assistant: Answer natural language queries using Gemini, such as spending habits or affordability questions. Use Gemini as a tool that assesses and reasons about a user's queries before making decisions.
- Proactive Financial Insights: AI identifies trends and offers helpful advice (e.g., budget alerts, subscription management, savings suggestions).
- Automated Budgeting and Goal Setting: Automatically categorize transactions, track budgets, and allow users to set financial goals. The AI then helps create a plan and tracks the user's progress.
- API Endpoints via Cloud Functions: Establish key API endpoints using Cloud Functions to handle secure interactions, such as /fetchTransactions, /askAI, /generateInsights.
- Firestore Integration: Utilize Firestore as the real-time NoSQL database for user data, transactions, and budgets with security rules.

## Style Guidelines:

- Primary color: Deep teal (#008080) for a sense of financial security and sophistication.
- Background color: Light teal (#E0F8F8), a desaturated version of the primary color to provide a calm backdrop.
- Accent color: Gold (#D4AF37) for highlighting important financial information and CTAs, suggesting wealth and value.
- Body and headline font: 'Alegreya', a humanist serif with an elegant, intellectual, contemporary feel.
- Use minimalist, line-based icons to represent financial concepts and categories.
- Dashboard should have a clear, modular layout, emphasizing key metrics with dynamic charts and graphs.
- Subtle animations should be used to provide feedback on user interactions and highlight important updates.