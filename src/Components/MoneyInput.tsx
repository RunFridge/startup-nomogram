import React from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 10fr 1fr 1fr;
  margin: 1em 0;

  input[type="number"] {
    width: 80%;
  }
`;

const Label = styled.label`
  text-align: center;
`;
// STYLE END ====

type _Porps = {
  label: string;
  unit: string;
  moneyType: "expense" | "revenue" | "growth";
  value: number;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
};

function MoneyInput({ label, unit, moneyType, value, onChange }: _Porps) {
  const rangeId = moneyType + "Range";
  const numberId = moneyType + "Number";

  return (
    <InputWrapper>
      <Label htmlFor={rangeId}>{label}</Label>
      <input type="range" id={rangeId} value={value} onChange={onChange} />
      <input type="number" id={numberId} value={value} onChange={onChange} />
      <Label htmlFor={numberId}>{unit}</Label>
    </InputWrapper>
  );
}

export default MoneyInput;
