import { WEEKLY, MONTHLY, YEARLY, TIMEFRAME_NAMES } from '../../utils/constant';

type MinMax = [number, number];

export interface ITimeframe {
  name: typeof TIMEFRAME_NAMES[number];
  constant: number;
  money: MinMax;
  growth: MinMax;
  growthStep: 0.01 | 0.1 | 1;
  growthToFixed: 0 | 1 | 2;
}

export const timeframePayloads = {
  WEEKLY,
  MONTHLY,
  YEARLY,
};
