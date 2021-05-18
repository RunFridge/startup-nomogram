import { EXPENSE_COLOR, REVENUE_COLOR } from '../../utils/constant';

export interface IPoint {
  x: number;
  y: number;
  radius: number;
  style: typeof EXPENSE_COLOR | typeof REVENUE_COLOR;
}
