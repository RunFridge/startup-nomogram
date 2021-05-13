import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Startup from '../components/Startup';
import {
  IState,
  updateExpense,
  updateProfit,
  updateGrowth,
  toggleTimeframe,
  toggleCurrency,
} from '../module/startup';

const StartupContainer: React.FC = () => {
  const { expense, profit, growth, currency, breakEvenPoint } = useSelector(
    (state: IState) => state,
  );
  const dispatch = useDispatch();
  const onExpenseChange = useCallback(
    (expense: number) => dispatch(updateExpense(expense)),
    [dispatch],
  );
  const onProfitChange = useCallback(
    (profit: number) => dispatch(updateProfit(profit)),
    [dispatch],
  );
  const onGrowthChange = useCallback(
    (growth: number) => dispatch(updateGrowth(growth)),
    [dispatch],
  );
  const onTimeframeClick = useCallback(
    () => dispatch(toggleTimeframe()),
    [dispatch],
  );
  const onCurrencyClick = useCallback(
    () => dispatch(toggleCurrency()),
    [dispatch],
  );
  return (
    <Startup
      expense={expense}
      profit={profit}
      growth={growth}
      currency={currency}
      breakEvenPoint={breakEvenPoint}
      onExpenseChange={onExpenseChange}
      onProfitChange={onProfitChange}
      onGrowthChange={onGrowthChange}
      onTimeframeClick={onTimeframeClick}
      onCurrencyClick={onCurrencyClick}
    />
  );
};

export default StartupContainer;
