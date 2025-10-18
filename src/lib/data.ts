export type Account = {
  id: string;
  name: string;
  balance: number;
  type: "checking" | "savings" | "credit";
};

export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
};

export type Bill = {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
};

export type Budget = {
  id: string;
  category: string;
  limit: number;
  spent: number;
};

export type Goal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
};

export type Investment = {
  id: string;
  name: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
};

export type Loan = {
  id: string;
  name: string;
  principal: number;
  interestRate: number;
  emi: number;
  remainingBalance: number;
};

export const accounts: Account[] = [
  { id: "acc1", name: "Main Checking", balance: 450000, type: "checking" },
  { id: "acc2", name: "High-Yield Savings", balance: 2000000, type: "savings" },
  { id: "acc3", name: "Travel Rewards Card", balance: -70000, type: "credit" },
];

export const transactions: Transaction[] = [
  {
    id: "txn1",
    date: "2024-07-22",
    description: "Groceries at FreshMart",
    amount: -10000,
    category: "Groceries",
  },
  {
    id: "txn2",
    date: "2024-07-21",
    description: "Dinner with friends",
    amount: -7000,
    category: "Restaurants",
  },
  {
    id: "txn3",
    date: "2024-07-20",
    description: "Monthly Salary",
    amount: 290000,
    category: "Income",
  },
  {
    id: "txn4",
    date: "2024-07-20",
    description: "Netflix Subscription",
    amount: -649,
    category: "Subscriptions",
  },
  {
    id: "txn5",
    date: "2024-07-19",
    description: "Petrol",
    amount: -4500,
    category: "Transport",
  },
];

export const bills: Bill[] = [
  {
    id: "bill1",
    name: "Rent",
    amount: 150000,
    dueDate: "2024-08-01",
  },
  {
    id: "bill2",
    name: "Electricity",
    amount: 6000,
    dueDate: "2024-08-15",
  },
  {
    id: "bill3",
    name: "Internet",
    amount: 5000,
    dueDate: "2024-08-10",
  },
];

export const budgets: Budget[] = [
  {
    id: "bud1",
    category: "Groceries",
    limit: 40000,
    spent: 30000,
  },
  {
    id: "bud2",
    category: "Restaurants",
    limit: 20000,
    spent: 18000,
  },
  {
    id: "bud3",
    category: "Shopping",
    limit: 25000,
    spent: 12000,
  },
  {
    id: "bud4",
    category: "Transport",
    limit: 12000,
    spent: 9000,
  },
];

export const goals: Goal[] = [
  {
    id: "goal1",
    name: "Vacation to Europe",
    targetAmount: 400000,
    currentAmount: 180000,
    deadline: "2025-06-01",
  },
  {
    id: "goal2",
    name: "Pay off Credit Card",
    targetAmount: 70000,
    currentAmount: 16000,
    deadline: "2024-10-01",
  },
];

export let investments: Investment[] = [
  { id: "inv1", name: "Reliance Industries", quantity: 10, purchasePrice: 2800, currentPrice: 2950 },
  { id: "inv2", name: "Tata Consultancy Services", quantity: 20, purchasePrice: 3800, currentPrice: 3850 },
  { id: "inv3", name: "HDFC Bank", quantity: 50, purchasePrice: 1600, currentPrice: 1670 },
];

export const loans: Loan[] = [
    { id: "loan1", name: "Home Loan", principal: 5000000, interestRate: 8.5, emi: 43391, remainingBalance: 4850000 },
    { id: "loan2", name: "Car Loan", principal: 800000, interestRate: 9.2, emi: 16683, remainingBalance: 650000 },
];
