import React from "react";
import styled from "styled-components";
import { koreanLocalizeValue, TimeFrame } from "../utils";

const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr 1fr;
  margin: 1em 0;

  & > :not(:nth-child(2)) {
    place-items: center;
  }
`;

const NumberInputWrapper = styled.div`
  display: flex;
`;

const NumberInput = styled.input`
  padding: 0.5em;
  margin: 0 1em;
  border-radius: 2em;
`;

const Label = styled.label`
  text-align: center;
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

  const isExp = label.includes("지출");
  const isRev = label.includes("수익");
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
      <NumberInputWrapper>
        <NumberInput
          type="number"
          id={numberId}
          value={value}
          onChange={onChange}
          step={step}
          max={max}
        />
        <Label htmlFor={numberId}>{unit}</Label>
      </NumberInputWrapper>
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
