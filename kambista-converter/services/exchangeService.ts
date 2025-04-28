import { api } from '../api/client';

export interface CurrentRateResponse {
  bid: number;
  bidChange: number;
  ask: number;
  askChange: number;
  date: string;
  author: string;
  created: string;
}

export interface CalculateExchangeResponse {
  rate: number;
  exchange: number;
  tc: { bid: number; ask: number };
  data: { operate: boolean; msg: string };
  savings: { amount: string; currency: string };
}

export async function calculateExchange(
  originCurrency: string,
  destinationCurrency: string,
  amount: number,
): Promise<CalculateExchangeResponse> {
  const params = { originCurrency, destinationCurrency, amount, active: 'S' };

  try {
    const res = await api.get<CalculateExchangeResponse>(
      'exchange/calculates',
      { params },
    );
    return res.data;
  } catch (err: any) {
    console.error(
      '[calculateExchange:ERROR]',
      'status=',
      err.response?.status,
      'body=',
      err.response?.data,
    );
    throw err;
  }
}

export async function getCurrentKambistaRate(): Promise<CurrentRateResponse> {
  const res = await api.get<CurrentRateResponse>('exchange/kambista/current');
  return res.data;
}

export interface CalculateExchangeResponse {
  rate: number;
  exchange: number;
  tc: { bid: number; ask: number };
  data: { operate: boolean; msg: string };
  savings: { amount: string; currency: string };
}
