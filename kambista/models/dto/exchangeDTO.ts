export interface ExchangeRateResponse {
  bid: number;
  bidChange: number;
  ask: number;
  askChange: number;
  date: Date;
  author: string;
  created: Date;
}

export interface CalculatorRequest {
  originCurrency: string;
  destinationCurrency: string;
  amount: number;
  active: string;
}

export interface CalculatorResponse {
  rate: number;
  exchange: number;
  tc: { bid: number; ask: number };
  data: { operate: boolean; msg: string };
  savings: { amount: string; currency: string };
}
