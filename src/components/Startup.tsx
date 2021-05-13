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
  breakEvenPoint,
  onExpenseChange,
  onProfitChange,
  onGrowthChange,
  onTimeframeClick,
  onCurrencyClick,
}) => {
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
        CHANGE TIME
      </button>
      <section>
        <input
          type="range"
          onChange={(e) => {
            onExpenseChange(+e.target.value);
          }}
        />
        <h2>{Math.round(expense)}</h2>
      </section>
      <section>
        <input
          type="range"
          onChange={(e) => {
            onProfitChange(+e.target.value);
          }}
        />
        <h2>{Math.round(profit)}</h2>
      </section>
      <section>
        <input
          type="range"
          onChange={(e) => {
            onGrowthChange(+e.target.value);
          }}
        />
        <h2>{growth.toFixed(2)}</h2>
      </section>
      <h3>{computeBreakEvenYear(breakEvenPoint)} Years</h3>
    </FlexBox>
  );
};

export default Startup;
