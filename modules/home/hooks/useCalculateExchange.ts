import { useCustomMutation } from "@/hooks/useCustomMutation";
import { exchangeService } from "@/services/api/exchangeService";

interface IUseCalculateExchangeParams {
  originCurrency: string;
  destinationCurrency: string;
  amount: number;
}

export const useCalculateExchange = () => {
  const mutation = useCustomMutation({
    mutationFn: ({
      originCurrency,
      destinationCurrency,
      amount
    }: IUseCalculateExchangeParams) =>
      exchangeService.calculateExchange(
        originCurrency,
        destinationCurrency,
        amount
      )
  });

  return {
    handle: mutation.mutateAsync,
    data: mutation.data,
    loading: mutation.isPending,
    error: mutation.error
  };
};
