import { exchangeService } from "@/services/api/exchangeService";
import { useCustomMutation } from "../../../hooks/useCustomMutation";

export const useGetCurrentExchange = () => {
  const mutation = useCustomMutation({
    mutationFn: () => exchangeService.getCurrentExchangeRate()
  });

  return {
    handle: mutation.mutateAsync,
    data: mutation.data,
    loading: mutation.isPending,
    error: mutation.error
  };
};
