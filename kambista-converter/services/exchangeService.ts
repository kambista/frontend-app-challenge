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

  const fullUrl = api.getUri({ url: 'exchange/calculates', params });
  console.log('[calculateExchange] full URL →', fullUrl);

  try {
    const res = await api.get<CalculateExchangeResponse>(
      'exchange/calculates',
      { params },
    );
    console.log('[calculateExchange] status=', res.status, 'data=', res.data);
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
  console.log(
    '[getCurrentKambistaRate]',
    (res.config?.baseURL ?? '') + (res.config?.url ?? ''),
    res.status,
  );
  return res.data;
}

export interface CalculateExchangeResponse {
  rate: number;
  exchange: number;
  tc: { bid: number; ask: number };
  data: { operate: boolean; msg: string };
  savings: { amount: string; currency: string };
}
