import { Reducer } from 'redux';
import { computeBreakEvenPoint } from '../utils/calculator';
import { DAYS_PER_YEAR } from '../utils/constant';

// Types
export interface IAction {
  type: string;
  payload?: any;
}
export interface IState {
  growth: number;
  expense: number;
  profit: number;
  breakEvenPoint: number;
  currency: keyof typeof currencyPayloads;
}

// Payloads constants
export const timeframeConstants = {
  WEEKLY_TO_MONTHLY: DAYS_PER_YEAR / 7 / 12,
  MONTHLY_TO_YEARLY: 12,
  YEARLY_TO_WEEKLY: 1 / (DAYS_PER_YEAR / 7),
};
export const currencyPayloads = {
  USD: 'USD' as const,
  KRW: 'KRW' as const,
};

//   Actions
export const UPDATE_EXPENSE = 'startup/UPDATE_EXPENSE' as const;
export const UPDATE_PROFIT = 'startup/UPDATE_PROFIT' as const;
export const UPDATE_GROWTH = 'startup/UPDATE_GROWTH' as const;

export const TOGGLE_TIMEFRAME = 'startup/TOGGLE_TIMEFRAME' as const;

export const TOGGLE_CURRENCY = 'startup/TOGGLE_CURRENCY' as const;

// Action Creators
export const updateExpense = (expense: number) => ({
  type: UPDATE_EXPENSE,
  payload: expense,
});
export const updateProfit = (profit: number) => ({
  type: UPDATE_PROFIT,
  payload: profit,
});
export const updateGrowth = (growth: number) => ({
  type: UPDATE_GROWTH,
  payload: growth,
});
let timeframeIdx = -1;
export const toggleTimeframe = () => {
  const timeframes = Object.values(timeframeConstants);
  function nextTimeframe() {
    timeframeIdx = ++timeframeIdx % timeframes.length;
    return timeframes[timeframeIdx];
  }
  return {
    type: TOGGLE_TIMEFRAME,
    payload: nextTimeframe(),
  };
};
let currencyIdx = -1;
export const toggleCurrency = () => {
  const currencies = Object.values(currencyPayloads);
  function nextCurrency() {
    currencyIdx = ++currencyIdx % currencies.length;
    return currencies[currencyIdx];
  }
  return {
    type: TOGGLE_CURRENCY,
    payload: nextCurrency(),
  };
};

// State
const initialState = (expense = 1600, growth = 2.5, profit = 100): IState => {
  return {
    expense,
    growth,
    profit,
    breakEvenPoint: computeBreakEvenPoint(expense, growth, profit),
    currency: currencyPayloads.USD,
  };
};

// Reducer
const startup: Reducer<IState, IAction> = (state = initialState(), action) => {
  switch (action.type) {
    case UPDATE_EXPENSE:
      const expense = action.payload;
      return {
        ...state,
        expense,
        breakEvenPoint: computeBreakEvenPoint(
          expense,
          state.growth,
          state.profit,
        ),
      };
    case UPDATE_GROWTH:
      const growth = action.payload;
      return {
        ...state,
        growth,
        breakEvenPoint: computeBreakEvenPoint(
          state.expense,
          growth,
          state.profit,
        ),
      };
    case UPDATE_PROFIT:
      const profit = action.payload;
      return {
        ...state,
        profit,
        breakEvenPoint: computeBreakEvenPoint(
          state.expense,
          state.growth,
          profit,
        ),
      };
    case TOGGLE_TIMEFRAME:
      const timeframeConstant = action.payload;
      return {
        ...state,
        expense: state.expense * timeframeConstant,
        profit: state.profit * timeframeConstant,
        growth:
          (Math.exp(Math.log(1 + state.growth / 100) * timeframeConstant) - 1) *
          100,
      };
    case TOGGLE_CURRENCY:
      const currency = action.payload;
      return {
        ...state,
        currency,
      };
    default:
      return state;
  }
};

export default startup;
