import React from 'react';
import styled from 'styled-components';
import { IAction, IState } from '../module/startup';
import { computeBreakEvenYear } from '../utils/calculator';

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

// END STYLE ==

interface IProps extends IState {
  onExpenseChange: (expense: number) => IAction;
  onProfitChange: (profit: number) => IAction;
  onGrowthChange: (growth: number) => IAction;
  onTimeframeClick: () => IAction;
  onCurrencyClick: () => IAction;
}

const Startup: React.FC<IProps> = ({
  expense,
  profit,
  growth,
  currency,
  timeframe,
  breakEvenPoint,
  onExpenseChange,
  onProfitChange,
  onGrowthChange,
  onTimeframeClick,
  onCurrencyClick,
}) => {
  const timeframeName = timeframe.name;
  const [moneyMin, moneyMax] = timeframe.money;
  const [growthMin, growthMax] = timeframe.growth;
  return (
    <FlexBox>
      <h1>{currency}</h1>
      <button
        onClick={() => {
          onCurrencyClick();
        }}
      >
        CHANGE CURRENCY
      </button>
      <button
        onClick={() => {
          onTimeframeClick();
        }}
      >
        {timeframeName}
      </button>
      <section>
        <input
          type="range"
          onChange={(e) => {
            onExpenseChange(+e.target.value);
          }}
          value={expense}
          min={moneyMin}
          max={moneyMax}
        />
        <input
          type="number"
          onChange={(e) => {
            onExpenseChange(+e.target.value);
          }}
          value={expense}
          min={moneyMin}
          max={moneyMax}
        />
        <h2>{Math.round(expense)}</h2>
      </section>
      <section>
        <input
          type="range"
          onChange={(e) => {
            onProfitChange(+e.target.value);
          }}
          value={profit}
          min={moneyMin}
          max={moneyMax}
        />
        <input
          type="number"
          onChange={(e) => {
            onProfitChange(+e.target.value);
          }}
          value={profit}
          min={moneyMin}
          max={moneyMax}
        />
        <h2>{Math.round(profit)}</h2>
      </section>
      <section>
        <input
          type="range"
          onChange={(e) => {
            onGrowthChange(+e.target.value);
          }}
          value={growth}
          min={growthMin}
          max={growthMax}
          step={0.01}
        />
        <input
          type="number"
          onChange={(e) => {
            onGrowthChange(+e.target.value);
          }}
          value={growth}
          min={growthMin}
          max={growthMax}
          step={0.01}
        />
        <h2>{growth.toFixed(2)}</h2>
      </section>
      <h3>{computeBreakEvenYear(breakEvenPoint)} Years</h3>
    </FlexBox>
  );
};

export default Startup;
