import { ICalculateExchange } from "@/types/storage/ICalculateExchange";
import { ICurrentExchange } from "@/types/storage/ICurrentExchange";

class ExchangeService {
  private static instance: ExchangeService;
  private baseUrl: string | undefined;

  constructor() {
    this.baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
  }

  static getInstance() {
    if (!ExchangeService.instance)
      ExchangeService.instance = new ExchangeService();
    return ExchangeService.instance;
  }

  async getCurrentExchangeRate(): Promise<ICurrentExchange> {
    return fetch(`${this.baseUrl}/exchange/kambista/current`)
      .then((response) => response.json())
      .then((data) => data);
  }

  async calculateExchange(
    originCurrency: string,
    destinationCurrency: string,
    amount: number
  ): Promise<ICalculateExchange> {
    return fetch(
      `${this.baseUrl}/exchange/calculates?originCurrency=${originCurrency}&destinationCurrency=${destinationCurrency}&amount=${amount}&active=S`
    )
      .then((response) => response.json())
      .then((data) => data);
  }
}

export const exchangeService = ExchangeService.getInstance();
