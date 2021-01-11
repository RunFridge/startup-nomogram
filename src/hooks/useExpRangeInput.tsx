import { useState } from "react";

class ExponentCalculator {
  private WEIGHT = Math.log(1000) / 100;
  getExpOutFromExpBase(expBase: number): number {
    return Math.round(Math.exp(this.WEIGHT * expBase));
  }
  getExpBaseFromExpOut(expOut: number): number {
    return Math.log(expOut) / this.WEIGHT;
  }
}

function useExpRangeInput(): [
  number,
  number,
  (event: React.ChangeEvent<HTMLInputElement>) => void,
  (event: React.ChangeEvent<HTMLInputElement>) => void,
  (outMax: number) => number
] {
  // States
  const [expBase, setExpBase] = useState<number>(0);
  const [expOut, setExpOut] = useState<number>(0);

  // Calculator
  const Calculator = new ExponentCalculator();

  // onInput Event listener
  const onExpBaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    const expBase = parseInt(value);
    setExpBase(expBase);

    const newExpOut = Calculator.getExpOutFromExpBase(expBase);
    setExpOut(newExpOut);
  };

  // onInput Event listener
  const onExpOutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    const expOut = parseFloat(value);
    setExpOut(expOut);

    const newExpBase = Calculator.getExpBaseFromExpOut(expOut);
    setExpBase(newExpBase);
  };

  const calculateRangeMax = (outMax: number): number => {
    return Math.round(Calculator.getExpBaseFromExpOut(outMax));
  };

  return [expBase, expOut, onExpBaseChange, onExpOutChange, calculateRangeMax];
}

export default useExpRangeInput;
