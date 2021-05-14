import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITimeframe, timeframePayloads } from './calculatorTypes';

interface CalculatorState {
  expense: number;
  revenue: number;
  growth: number;
  timeframe: ITimeframe;
}

const initialState: CalculatorState = {
  expense: 1600,
  revenue: 100,
  growth: 2.5,
  timeframe: timeframePayloads.WEEKLY,
};

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    changeExpense: (state, action: PayloadAction<number>) => {
      state.expense = action.payload;
    },
    changeRevenue: (state, action: PayloadAction<number>) => {
      state.revenue = action.payload;
    },
    changeGrowth: (state, action: PayloadAction<number>) => {
      state.growth = action.payload;
    },
    toggleTimeframe: (state) => {
      const {
        timeframe: { name },
      } = state;
      switch (name) {
        case 'weekly':
          state.timeframe = timeframePayloads.MONTHLY;
          break;
        case 'monthly':
          state.timeframe = timeframePayloads.YEARLY;
          break;
        case 'yearly':
          state.timeframe = timeframePayloads.WEEKLY;
          break;
      }
      //   Compute updated exp,rev,growth after updating timeframe
      const { constant } = state.timeframe;
      state.expense = state.expense * constant;
      state.revenue = state.revenue * constant;
      state.growth =
        (Math.exp(Math.log(1 + state.growth / 100) * constant) - 1) * 100;
    },
  },
});

export const { changeExpense, changeGrowth, changeRevenue, toggleTimeframe } =
  calculatorSlice.actions;

export default calculatorSlice.reducer;
