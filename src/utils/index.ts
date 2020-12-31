function computeBaseLog(x: number, y: number): number {
  /*
      Compute logarithm of y with base x

      i.e)
        2 x 2 x 2 = 8
        computeBaseLog(2, 8) = 3
    */
  return Math.log(y) / Math.log(x);
}

export function computeBreakEven(state: moneyState): number {
  const breakEvenPoint = computeBaseLog(
    state.growth / 100 + 1,
    state.expense / state.revenue
  );
  return breakEvenPoint;
}
