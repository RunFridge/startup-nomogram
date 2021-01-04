export enum TimeFrame {
  weekly = "weekly",
  monthly = "monthly",
  yearly = "yearly",
}

export class startupCalculator {
  private DAYS_PER_YEAR = 365.2425;

  private computeBaseLog(x: number, y: number): number {
    /*
        Compute logarithm of y with base x
  
        i.e)
          2 x 2 x 2 = 8
          computeBaseLog(2, 8) = 3
      */
    return Math.log(y) / Math.log(x);
  }

  computeBreakEven(currentState: MoneyInputs): number {
    const breakEvenPoint = this.computeBaseLog(
      currentState.growth / 100 + 1,
      currentState.expense / currentState.revenue
    );

    return breakEvenPoint;
  }

  convertTimeFrame(
    currentState: MoneyInputs,
    currentTimeFrame: TimeFrame
  ): [TimeFrame, MoneyInputs] {
    const WEEKLY_TO_MONTHLY = this.DAYS_PER_YEAR / 7 / 12;
    const MONTHLY_TO_YEARLY = 12;
    const YEARLY_TO_WEEKLY = 1 / (this.DAYS_PER_YEAR / 7);

    let C = 1;
    let newState: MoneyInputs = currentState;
    let newTimeFrame: TimeFrame = currentTimeFrame;

    if (currentTimeFrame === TimeFrame.weekly) {
      C = WEEKLY_TO_MONTHLY;
      newTimeFrame = TimeFrame.monthly;
    } else if (currentTimeFrame === TimeFrame.monthly) {
      C = MONTHLY_TO_YEARLY;
      newTimeFrame = TimeFrame.yearly;
    } else if (currentTimeFrame === TimeFrame.yearly) {
      C = YEARLY_TO_WEEKLY;
      newTimeFrame = TimeFrame.weekly;
    }

    newState.expense = currentState.expense * C;
    newState.revenue = currentState.revenue * C;
    newState.growth =
      (Math.exp(Math.log(1 + currentState.growth / 100) * C) - 1) * 100;

    return [newTimeFrame, newState];
  }
}
