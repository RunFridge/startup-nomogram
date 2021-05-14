import React, { ChangeEventHandler, MouseEventHandler, useMemo } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  changeExpense,
  changeGrowth,
  changeRevenue,
  toggleTimeframe,
} from '../features/calculator/calculatorSlice';
import {
  computeBreakEvenPoint,
  computeBreakEvenYear,
} from '../utils/calculator';

const GridBox = styled.div`
  display: grid;
  place-content: center;
`;
// STYLE END ==

const Calculator = () => {
  const {
    expense,
    growth,
    revenue,
    timeframe: {
      name: timeframeName,
      money: moneyRange,
      growth: growthRange,
      growthStep,
      growthToFixed,
    },
  } = useAppSelector((state) => state.calculator);
  const [minMoney, maxMoney] = moneyRange;
  const [minGrowth, maxGrowth] = growthRange;
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(toggleTimeframe());
  };
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const {
      target: { value },
    } = e;
    switch (e.target.id) {
      case 'exp':
        dispatch(changeExpense(+value));
        break;
      case 'rev':
        dispatch(changeRevenue(+value));
        break;
      case 'grw':
        dispatch(changeGrowth(+value));
        break;
      default:
        break;
    }
  };

  const breakEvenYear = useMemo(() => {
    return computeBreakEvenYear(
      computeBreakEvenPoint(expense, growth, revenue),
      timeframeName,
    );
  }, [expense, revenue, growth]);

  return (
    <GridBox>
      <h1>Startup Calculator</h1>
      <button onClick={onClick}>{timeframeName}</button>
      <div>
        <label htmlFor="exp">지출</label>
        <input
          type="number"
          value={Math.round(expense)}
          id="exp"
          onChange={onChange}
          min={minMoney}
          max={maxMoney}
        />
      </div>
      <div>
        <label htmlFor="rev">수익</label>
        <input
          type="number"
          value={Math.round(revenue)}
          id="rev"
          onChange={onChange}
          min={minMoney}
          max={maxMoney}
        />
      </div>
      <div>
        <label htmlFor="grw">성장률</label>
        <input
          type="number"
          value={growth.toFixed(growthToFixed)}
          id="grw"
          onChange={onChange}
          min={minGrowth}
          max={maxGrowth}
          step={growthStep}
        />
      </div>
      <h3>{breakEvenYear}년</h3>
    </GridBox>
  );
};

export default Calculator;
