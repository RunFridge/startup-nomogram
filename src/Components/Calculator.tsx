import React, { useState } from "react";
import styled from "styled-components";
import { TimeFrame, startupCalculator } from "../utils";
import MoneyInput from "./MoneyInput";
import TimeFrameSwitch from "./TimeFrameSwitch";

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
// STYLE END ====

const suCalc = new startupCalculator();

function Calculator() {
  const [moneyInputs, setMoneyInputs] = useState<MoneyInputs>({
    expense: 1600,
    revenue: 100,
    growth: 2.5,
  });
  const [timeFrame, setTimeFrame] = useState<TimeFrame>(TimeFrame.weekly);

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
  };

  const handleTimeframeChange = () => {
    const [newTimeFrame, newMoneyInput] = suCalc.convertTimeFrame(
      moneyInputs,
      timeFrame
    );
    setMoneyInputs(newMoneyInput);
    setTimeFrame(newTimeFrame);
  };

  return (
    <InputsContainer>
      <TimeFrameSwitch
        currentTimeFrame={timeFrame}
        onClick={handleTimeframeChange}
      />
      <MoneyInput
        label="지출"
        unit="만원"
        moneyType="expense"
        value={moneyInputs.expense}
        onChange={handleChange}
      />
      <MoneyInput
        label="수익"
        unit="만원"
        moneyType="revenue"
        value={moneyInputs.revenue}
        onChange={handleChange}
      />
      <MoneyInput
        label="성장"
        unit="%"
        moneyType="growth"
        value={moneyInputs.growth}
        onChange={handleChange}
      />
    </InputsContainer>
  );
}

export default Calculator;
