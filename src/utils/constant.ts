import { ITimeframe } from '../features/calculator/calculatorTypes';

// Calculator Constants
export const DAYS_PER_YEAR = 365.2425;

export const TIMEFRAME_NAMES = ['weekly', 'monthly', 'yearly'] as const;

export const WEEKLY: ITimeframe = {
  name: 'weekly',
  constant: 1 / (DAYS_PER_YEAR / 7),
  money: [0, 1_000_000],
  growth: [0, 10],
  growthStep: 0.01,
  growthToFixed: 2,
};
export const MONTHLY: ITimeframe = {
  name: 'monthly',
  constant: DAYS_PER_YEAR / 7 / 12,
  money: [0, 3_000_000],
  growth: [0, 50],
  growthStep: 0.1,
  growthToFixed: 1,
};
export const YEARLY: ITimeframe = {
  name: 'yearly',
  constant: 12,
  money: [0, 100_000_000],
  growth: [0, 10_000],
  growthStep: 1,
  growthToFixed: 0,
};

// Canvas Constants
export const EXPENSE_COLOR = '#e74c3c' as const;
export const REVENUE_COLOR = '#2ecc71' as const;
