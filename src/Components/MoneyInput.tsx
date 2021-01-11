import React from "react";
import useExpRangeInput from "../hooks/useExpRangeInput";
import {
  GridContainer,
  InputsContainer,
  RangeInput,
  NumberInputWrapper,
  NumberLabel,
  NumberInput,
} from "../styles/moneyInputComponents";

type _Props = {
  initialValue: number;
  label: string;
  max?: number;
};

function MoneyInput({ initialValue, label = "만원", max = 100000 }: _Props) {
  const [
    expBase,
    expOut,
    onExpBaseChange,
    onExpOutChange,
    calculateRangeMax,
  ] = useExpRangeInput(initialValue);

  return (
    <GridContainer>
      <InputsContainer>
        <RangeInput
          type="range"
          onInput={onExpBaseChange}
          value={expBase}
          max={calculateRangeMax(max)}
        />
        <NumberInputWrapper>
          <NumberInput
            type="number"
            onInput={onExpOutChange}
            value={expOut}
            id="expOut"
            max={max}
          />
          <NumberLabel htmlFor="expOut">{label}</NumberLabel>
        </NumberInputWrapper>
      </InputsContainer>
    </GridContainer>
  );
}

export default MoneyInput;
