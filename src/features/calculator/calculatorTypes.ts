import { DAYS_PER_YEAR } from '../../utils/constant';

type MinMax = [number, number];

export const timeframeNames = ['weekly', 'monthly', 'yearly'] as const;

export interface ITimeframe {
  name: typeof timeframeNames[number];
  constant: number;
  money: MinMax;
  growth: MinMax;
  growthStep: 0.01 | 0.1 | 1;
  growthToFixed: 0 | 1 | 2;
}

const WEEKLY: ITimeframe = {
  name: 'weekly',
  constant: 1 / (DAYS_PER_YEAR / 7),
  money: [0, 1_000_000],
  growth: [0, 10],
  growthStep: 0.01,
  growthToFixed: 2,
};
const MONTHLY: ITimeframe = {
  name: 'monthly',
  constant: DAYS_PER_YEAR / 7 / 12,
  money: [0, 3_000_000],
  growth: [0, 50],
  growthStep: 0.1,
  growthToFixed: 1,
};
const YEARLY: ITimeframe = {
  name: 'yearly',
  constant: 12,
  money: [0, 100_000_000],
  growth: [0, 10_000],
  growthStep: 1,
  growthToFixed: 0,
};

export const timeframePayloads = {
  WEEKLY,
  MONTHLY,
  YEARLY,
};
