export interface ICalculateExchange {
  rate: number;
  exchange: number;
  tc: ITc;
  data: IData;
  savings: ISavings;
}

interface ITc {
  bid: number;
  ask: number;
}

interface IData {
  operate: boolean;
  msg: string;
}

interface ISavings {
  amount: string;
  currency: string;
}
