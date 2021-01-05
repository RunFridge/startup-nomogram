import React, { useState } from "react";
import styled from "styled-components";
import { TimeFrame, moneyRange, startupCalculator } from "../utils";
import MoneyInput from "./MoneyInput";
import TimeFrameSwitch from "./TimeFrameSwitch";

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const BreakEvenYear = styled.p`
  text-align: center;
  margin: 1em 0;
  font-weight: bold;
  font-size: 1.5em;
`;
// STYLE END ====

const suCalc = new startupCalculator();

function Calculator() {
  const [moneyInputs, setMoneyInputs] = useState<MoneyInputs>({
    expense: 160,
    revenue: 10,
    growth: 2.5,
  });
  const [timeFrame, setTimeFrame] = useState<TimeFrame>(TimeFrame.weekly);
  const [moneyInputRange, setMoneyInputRange] = useState<MoneyRange>(
    moneyRange.weekly
  );
  const [breakEvenVal, setBreakEvenVal] = useState<number>(
    suCalc.computeBreakEven(moneyInputs)
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { id, value },
    } = event;

    const newMoneyInput = { ...moneyInputs };

    if (id.includes("expense")) {
      newMoneyInput.expense = parseInt(value);
    } else if (id.includes("revenue")) {
      newMoneyInput.revenue = parseInt(value);
    } else if (id.includes("growth")) {
      newMoneyInput.growth = parseFloat(value);
    }

    setMoneyInputs(newMoneyInput);
    setBreakEvenVal(suCalc.computeBreakEven(newMoneyInput));
  };

  const handleTimeframeChange = () => {
    const [
      newTimeFrame,
      newMoneyInput,
      newMoneyRange,
    ] = suCalc.convertTimeFrame(moneyInputs, timeFrame, moneyInputRange);
    setTimeFrame(newTimeFrame);
    setMoneyInputs(newMoneyInput);
    setMoneyInputRange(newMoneyRange);
  };

  return (
    <InputsContainer>
      <TimeFrameSwitch
        currentTimeFrame={timeFrame}
        onClick={handleTimeframeChange}
      />
      <MoneyInput
        label="➖ 지출"
        unit="만원"
        moneyType="expense"
        value={Math.round(moneyInputs.expense)}
        onChange={handleChange}
        max={moneyInputRange.expRevMax}
        timeFrame={timeFrame}
      />
      <MoneyInput
        label="➕ 수익"
        unit="만원"
        moneyType="revenue"
        value={Math.round(moneyInputs.revenue)}
        onChange={handleChange}
        max={moneyInputRange.expRevMax}
        timeFrame={timeFrame}
      />
      <MoneyInput
        label="📈 성장"
        unit="%"
        moneyType="growth"
        value={parseFloat(moneyInputs.growth.toFixed(1))}
        onChange={handleChange}
        max={moneyInputRange.growthMax}
        step={moneyInputRange.growthStep}
        timeFrame={timeFrame}
      />
      <BreakEvenYear>
        {breakEvenVal === Infinity
          ? "📉 성장을 못하고 있어요 😥 📉"
          : breakEvenVal <= 0
          ? "💸 이미 돈 많이 버는 중 😎 💸"
          : `📈 약 ${suCalc.computeBreakEvenYear(breakEvenVal)}년
        후 손익분기 😁 📈`}
      </BreakEvenYear>
    </InputsContainer>
  );
}

export default Calculator;
