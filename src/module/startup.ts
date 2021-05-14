import { Reducer } from 'redux';
import { computeBreakEvenPoint } from '../utils/calculator';
import { DAYS_PER_YEAR } from '../utils/constant';

// Types
type MinMax = [number, number];
export interface ITimeframe {
  name: 'weekly' | 'monthly' | 'yearly';
  constant: number;
  money: MinMax;
  growth: MinMax;
}
export interface IAction {
  type: string;
  payload?: any;
}
export interface IState {
  growth: number;
  expense: number;
  profit: number;
  breakEvenPoint: number;
  timeframe: ITimeframe;
  currency: keyof typeof currencyPayloads;
}

// Payloads constants
export const timeFrames: ITimeframe[] = [
  {
    name: 'weekly',
    constant: 1 / (DAYS_PER_YEAR / 7),
    money: [0, 1_000_000],
    growth: [0, 10],
  },
  {
    name: 'monthly',
    constant: DAYS_PER_YEAR / 7 / 12,
    money: [0, 3_000_000],
    growth: [0, 50],
  },
  {
    name: 'yearly',
    constant: 12,
    money: [0, 100_000_000],
    growth: [0, 10_000],
  },
];
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
let timeframeIdx = 0;
export const toggleTimeframe = () => {
  function nextTimeframe() {
    timeframeIdx = ++timeframeIdx % timeFrames.length;
    return timeFrames[timeframeIdx];
  }
  return {
    type: TOGGLE_TIMEFRAME,
    payload: nextTimeframe(),
  };
};
let currencyIdx = 0;
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
    timeframe: { ...timeFrames[0], constant: 1 },
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
      const timeframe = action.payload;
      return {
        ...state,
        timeframe,
        expense: state.expense * timeframe.constant,
        profit: state.profit * timeframe.constant,
        growth:
          (Math.exp(Math.log(1 + state.growth / 100) * timeframe.constant) -
            1) *
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
