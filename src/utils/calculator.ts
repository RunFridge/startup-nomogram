import { DAYS_PER_YEAR } from './constant';

/*
    Compute logarithm of y with base x

    i.e)
        2 x 2 x 2 = 8
        computeBaseLog(2, 8) = 3
*/
const computeBaseLog = (x: number, y: number): number =>
  Math.log(y) / Math.log(x);

export const computeBreakEvenPoint = (
  expense: number,
  growth: number,
  profit: number,
) => computeBaseLog(growth / 100 + 1, expense / profit);

export const computeBreakEvenYear = (breakEvenPoint: number): number =>
  Math.round((breakEvenPoint / (DAYS_PER_YEAR / 7)) * 10) / 10;
