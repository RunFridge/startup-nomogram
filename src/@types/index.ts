type MoneyInputs = {
  expense: number;
  revenue: number;
  growth: number;
};

type MoneyRange = {
  expRevMax: number;
  growthMax: number;
  growthStep: number;
};

type TimeFrameRange = {
  weekly: MoneyRange;
  monthly: MoneyRange;
  yearly: MoneyRange;
};
