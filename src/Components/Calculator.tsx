import React, { useState } from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  margin-bottom: 1em;
  & > :not(:nth-child(2)) {
    place-self: center;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > button {
    all: unset;
    cursor: pointer;
    text-decoration: underline;
    color: blue;

    &:active {
      color: purple;
    }
  }
`;

// STYLE END ====

function Calculator() {
  const [timeFrame, setTimeFrame] = useState<"weekly" | "monthly" | "yearly">(
    "weekly"
  );
  const [expense, setExpense] = useState<number>(1600);
  const [revenue, setRevenue] = useState<number>(100);
  const [growth, setGrowth] = useState<number>(2.5);

  const handleTimeFrameChange = () => {
    const DAYS_PER_YEAR = 365.2425;
    const WEEKS_PER_MONTH = DAYS_PER_YEAR / 7 / 12;
    const WEEKS_PER_YEAR = DAYS_PER_YEAR / 7;

    const newState: moneyState = {
      expense,
      revenue,
      growth,
    };

    switch (timeFrame) {
      case "weekly":
        setTimeFrame("monthly");
        newState.expense = expense * WEEKS_PER_MONTH;
        newState.revenue = revenue * WEEKS_PER_MONTH;
        newState.growth =
          (Math.exp(Math.log(1 + growth / 100) * WEEKS_PER_MONTH) - 1) * 100;
        break;
      case "monthly":
        setTimeFrame("yearly");
        newState.expense = expense * 12;
        newState.revenue = revenue * 12;
        newState.growth = (Math.exp(Math.log(1 + growth / 100) * 12) - 1) * 100;
        break;
      case "yearly":
        setTimeFrame("weekly");
        newState.expense = expense / WEEKS_PER_YEAR;
        newState.revenue = revenue / WEEKS_PER_YEAR;
        newState.growth =
          (Math.exp(Math.log(1 + growth / 100) / WEEKS_PER_YEAR) - 1) * 100;
        break;
    }
    setExpense(newState.expense);
    setRevenue(newState.revenue);
    setGrowth(newState.growth);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    switch (id) {
      case "expense":
        setExpense(parseInt(value));
        break;
      case "revenue":
        setRevenue(parseInt(value));
        break;
      case "growth":
        setGrowth(parseFloat(value));
        break;
    }
  };

  return (
    <div>
      <InputWrapper>
        <ButtonWrapper>
          <label htmlFor="timeFrame">{timeFrame.toUpperCase()}</label>
          <button id="timeFrame" onClick={handleTimeFrameChange}>
            Change
          </button>
        </ButtonWrapper>
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="expense">Expense (지출)</label>
        <input
          type="number"
          name="expense"
          id="expense"
          min="100"
          max="50000"
          value={Math.round(expense)}
          onChange={handleInput}
        />
        <span>(만원)</span>
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="revenue">Revenue (수익)</label>
        <input
          type="number"
          name="revenue"
          id="revenue"
          min="100"
          max="50000"
          value={Math.round(revenue)}
          onChange={handleInput}
        />
        <span>(만원)</span>
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="growth">Growth (성장률)</label>
        <input
          type="number"
          name="growth"
          id="growth"
          min="0"
          max="100"
          step="0.1"
          value={growth.toFixed(1)}
          onChange={handleInput}
        />
        <span>(%)</span>
      </InputWrapper>
    </div>
  );
}

export default Calculator;
