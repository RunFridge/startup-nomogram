import { DAYS_PER_YEAR, TIMEFRAME_NAMES } from './constant';

/*
    Compute logarithm of y with base x

    i.e)
        2 x 2 x 2 = 8
        computeBaseLog(2, 8) = 3
*/
const computeBaseLog = (x: number, y: number): number =>
  Math.log(y) / Math.log(x);

/*
    Round number to the first decimal point

    i.e)
      0.18 = 0.2
*/
const roundToFirst = (n: number) => Math.round(n * 10) / 10;

export const computeBreakEvenPoint = (
  expense: number,
  growth: number,
  revenue: number,
) => computeBaseLog(growth / 100 + 1, expense / revenue);

export const computeBreakEvenYear = (
  breakEvenPoint: number,
  timeframe: typeof TIMEFRAME_NAMES[number],
): number => {
  switch (timeframe) {
    case 'weekly':
      return roundToFirst(breakEvenPoint / (DAYS_PER_YEAR / 7));
    case 'monthly':
      return roundToFirst(breakEvenPoint / 12);
    case 'yearly':
      return roundToFirst(breakEvenPoint);
  }
};
