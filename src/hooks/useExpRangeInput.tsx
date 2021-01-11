import { useState } from "react";

function useExpRangeInput(): [
  number,
  number,
  (arg: React.ChangeEvent<HTMLInputElement>) => void,
  (arg: React.ChangeEvent<HTMLInputElement>) => void
] {
  const [expBase, setExpBase] = useState<number>(0);
  const [expOut, setExpOut] = useState<number>(0);

  const LogBaseConst = Math.log(1000) / 100;

  const onExpBaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setExpBase(parseInt(value));

    const newExpOut = Math.exp(LogBaseConst * parseInt(value));
    setExpOut(Math.round(newExpOut));
  };

  const onExpOutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setExpOut(parseFloat(value));

    const newExpBase = Math.log(parseFloat(value)) / LogBaseConst;
    setExpBase(newExpBase);
  };

  return [expBase, expOut, onExpBaseChange, onExpOutChange];
}

export default useExpRangeInput;
