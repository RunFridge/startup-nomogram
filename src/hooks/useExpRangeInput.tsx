import { useState } from "react";

function useExpRangeInput(): [number, number, () => void, () => void] {
  const [expBase, setExpBase] = useState<number>(0);
  const [expOut, setExpOut] = useState<number>(0);

  const LogBaseConst = Math.log(1000) / 100;

  const onExpBaseChange = () => {
    const newExpOut = Math.exp(LogBaseConst * expBase);
    setExpOut(Math.round(newExpOut));
  };

  const onExpOutChange = () => {
    const newExpBase = Math.log(expOut) / LogBaseConst;
    setExpBase(newExpBase);
  };

  return [expBase, expOut, onExpBaseChange, onExpOutChange];
}

export default useExpRangeInput;
