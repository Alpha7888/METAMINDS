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

export const accounts: Account[] = [
  { id: "acc1", name: "Main Checking", balance: 5420.5, type: "checking" },
  { id: "acc2", name: "High-Yield Savings", balance: 25000, type: "savings" },
  { id: "acc3", name: "Travel Rewards Card", balance: -850.75, type: "credit" },
];

export const transactions: Transaction[] = [
  {
    id: "txn1",
    date: "2024-07-22",
    description: "Groceries at Whole Foods",
    amount: -125.6,
    category: "Groceries",
  },
  {
    id: "txn2",
    date: "2024-07-21",
    description: "Dinner with friends",
    amount: -85.0,
    category: "Restaurants",
  },
  {
    id: "txn3",
    date: "2024-07-20",
    description: "Monthly Salary",
    amount: 3500.0,
    category: "Income",
  },
  {
    id: "txn4",
    date: "2024-07-20",
    description: "Netflix Subscription",
    amount: -15.99,
    category: "Subscriptions",
  },
  {
    id: "txn5",
    date: "2024-07-19",
    description: "Gasoline",
    amount: -55.2,
    category: "Transport",
  },
];

export const bills: Bill[] = [
  {
    id: "bill1",
    name: "Rent",
    amount: 1800,
    dueDate: "2024-08-01",
  },
  {
    id: "bill2",
    name: "Electricity",
    amount: 75,
    dueDate: "2024-08-15",
  },
  {
    id: "bill3",
    name: "Internet",
    amount: 60,
    dueDate: "2024-08-10",
  },
];

export const budgets: Budget[] = [
  {
    id: "bud1",
    category: "Groceries",
    limit: 500,
    spent: 380.5,
  },
  {
    id: "bud2",
    category: "Restaurants",
    limit: 250,
    spent: 220.75,
  },
  {
    id: "bud3",
    category: "Shopping",
    limit: 300,
    spent: 150.0,
  },
  {
    id: "bud4",
    category: "Transport",
    limit: 150,
    spent: 110.4,
  },
];

export const goals: Goal[] = [
  {
    id: "goal1",
    name: "Vacation to Italy",
    targetAmount: 5000,
    currentAmount: 2200,
    deadline: "2025-06-01",
  },
  {
    id: "goal2",
    name: "Pay off Credit Card",
    targetAmount: 850.75,
    currentAmount: 200,
    deadline: "2024-10-01",
  },
];
