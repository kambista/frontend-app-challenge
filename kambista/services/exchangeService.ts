import { instance } from '@/lib/axios/config';
import { CalculatorRequest, CalculatorResponse, ExchangeRateResponse } from '@/models/dto/exchangeDTO';

const ExchangeService = {
  async getExchangeRate(): Promise<ExchangeRateResponse> {
    const response = await instance.get<ExchangeRateResponse>(`/kambista/current`);
    return response.data;
  },

  async calculate(params: CalculatorRequest): Promise<CalculatorResponse> {
    const response = await instance.get<CalculatorResponse>(`/calculates`, { params: params });
    return response.data;
  },
};

export default ExchangeService;
