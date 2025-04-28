import { useCustomMutation } from "@/hooks/useCustomMutation";
import { bankAccountService } from "@/services/api/bankAccountService";
import { IBankAccountPayload } from "@/types/storage/IBankAccount";

interface IUserSaveBankAccountData {
  payload: IBankAccountPayload;
  userUuid: string;
}

export const useSaveBankAccountData = () => {
  const mutation = useCustomMutation({
    mutationFn: ({ payload, userUuid }: IUserSaveBankAccountData) =>
      bankAccountService.saveBankAccountData(payload, userUuid)
  });

  return {
    handle: mutation.mutateAsync,
    data: mutation.data,
    loading: mutation.isPending,
    error: mutation.error
  };
};
