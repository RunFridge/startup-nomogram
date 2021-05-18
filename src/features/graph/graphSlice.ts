import { createSlice } from '@reduxjs/toolkit';
import { IPoint } from './graphTypes';

interface CanvasState {
  expensePoint?: IPoint;
  revenuePoint?: IPoint;
  growthPoint?: IPoint;
}

const initialState: CanvasState = {};

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {},
});

export const {} = canvasSlice.actions;
export default canvasSlice.reducer;
