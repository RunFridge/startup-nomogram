import React from "react";
import styled from "styled-components";
import { koreanLocalizeValue, TimeFrame } from "../utils";

const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 10fr 1fr 1fr 3fr;
  margin: 1em 0;

  input[type="number"] {
    width: 80%;
  }

  & > :not(:nth-child(2)) {
    place-items: center;
  }
`;

const Label = styled.label`
  &:not(:nth-child(4)) {
    text-align: center;
  }
`;

const LocalizedValue = styled.h4`
  color: ${(props) => props.color};
`;
// STYLE END ====

type _Porps = {
  label: string;
  unit: string;
  moneyType: "expense" | "revenue" | "growth";
  value: number;
  step?: number;
  max: number;
  timeFrame: TimeFrame;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
};

function MoneyInput({
  label,
  unit,
  moneyType,
  value,
  step = 1,
  max,
  timeFrame,
  onChange,
}: _Porps) {
  const rangeId = moneyType + "Range";
  const numberId = moneyType + "Number";

  const isExp = label === "지출";
  const isRev = label === "수익";
  let isExpRev = isExp || isRev;

  let localTimeFrame;
  switch (timeFrame) {
    case TimeFrame.weekly:
      localTimeFrame = "주";
      break;
    case TimeFrame.monthly:
      localTimeFrame = "월";
      break;
    case TimeFrame.yearly:
      localTimeFrame = "연";
      break;
  }

  return (
    <InputWrapper>
      <Label htmlFor={rangeId}>{label}</Label>
      <input
        type="range"
        id={rangeId}
        value={value}
        onChange={onChange}
        step={step}
        max={max}
      />
      <input
        type="number"
        id={numberId}
        value={value}
        onChange={onChange}
        step={step}
        max={max}
      />
      <Label htmlFor={numberId}>{unit}</Label>
      {isExpRev ? (
        <Label htmlFor={numberId}>
          <LocalizedValue color={isExp ? "#e74c3c" : "#27ae60"}>
            {isExp ? "−" : "+"} {koreanLocalizeValue(value)} / {localTimeFrame}
          </LocalizedValue>
        </Label>
      ) : (
        <></>
      )}
    </InputWrapper>
  );
}

export default MoneyInput;
