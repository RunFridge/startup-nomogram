export enum TimeFrame {
  weekly = "weekly",
  monthly = "monthly",
  yearly = "yearly",
}

export const moneyRange: TimeFrameRange = {
  weekly: {
    expRevMax: 100000,
    growthMax: 10,
    growthStep: 0.1,
  },
  monthly: {
    expRevMax: 434813,
    growthMax: 51.3,
    growthStep: 0.1,
  },
  yearly: {
    expRevMax: 5217750,
    growthMax: 14346,
    growthStep: 1,
  },
};

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
    currentTimeFrame: TimeFrame,
    currentMoneyRange: MoneyRange
  ): [TimeFrame, MoneyInputs, MoneyRange] {
    const WEEKLY_TO_MONTHLY = this.DAYS_PER_YEAR / 7 / 12;
    const MONTHLY_TO_YEARLY = 12;
    const YEARLY_TO_WEEKLY = 1 / (this.DAYS_PER_YEAR / 7);

    let C = 1;
    let newState: MoneyInputs = currentState;
    let newTimeFrame: TimeFrame = currentTimeFrame;
    let newMoneyRange: MoneyRange = currentMoneyRange;

    if (currentTimeFrame === TimeFrame.weekly) {
      C = WEEKLY_TO_MONTHLY;
      newTimeFrame = TimeFrame.monthly;
      newMoneyRange = moneyRange.monthly;
    } else if (currentTimeFrame === TimeFrame.monthly) {
      C = MONTHLY_TO_YEARLY;
      newTimeFrame = TimeFrame.yearly;
      newMoneyRange = moneyRange.yearly;
    } else if (currentTimeFrame === TimeFrame.yearly) {
      C = YEARLY_TO_WEEKLY;
      newTimeFrame = TimeFrame.weekly;
      newMoneyRange = moneyRange.weekly;
    }

    newState.expense = currentState.expense * C;
    newState.revenue = currentState.revenue * C;
    newState.growth =
      (Math.exp(Math.log(1 + currentState.growth / 100) * C) - 1) * 100;

    return [newTimeFrame, newState, newMoneyRange];
  }

  computeBreakEvenYear(breakEvenVal: number): number {
    return Math.round((breakEvenVal / (this.DAYS_PER_YEAR / 7)) * 10) / 10;
  }
}

export const koreanLocalizeValue = (manVal: number): string => {
  /* 
    Compute korean localized value from Man-unit currency

    min = 0만원
    max = 1000000만원 = 100억원

    i.e)
      10000 = 10000만원 = 1억원
      12500 = 12500만원 = 1억2500만원
      100000 = 100000만원 = 10억원
   */

  const MAN = 10000;

  const eukUnit = Math.round(manVal / MAN);
  const manUnit = manVal % MAN;

  const eukStr = eukUnit ? `${eukUnit} 억` : "";

  return `${eukStr} ${manUnit} 만원`;
};
