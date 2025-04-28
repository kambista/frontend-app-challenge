import { bankAccountService } from "@/services/api/bankAccountService";
import { useCustomMutation } from "../../../hooks/useCustomMutation";

export const useGetBankAccounts = () => {
  const mutation = useCustomMutation({
    mutationFn: () => bankAccountService.getBankAccounts()
  });

  return {
    handle: mutation.mutateAsync,
    data: mutation.data || [],
    loading: mutation.isPending,
    error: mutation.error
  };
};
