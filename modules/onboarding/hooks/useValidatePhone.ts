import { useCustomMutation } from "@/hooks/useCustomMutation";
import { validationService } from "@/services/api/validationService";

interface IUseValidatePhone {
  phoneNumber: string;
}

export const useValidatePhone = () => {
  const mutation = useCustomMutation({
    mutationFn: ({ phoneNumber }: IUseValidatePhone) =>
      validationService.validatePhone(phoneNumber)
  });

  return {
    handle: mutation.mutateAsync,
    data: mutation.data,
    loading: mutation.isPending,
    error: mutation.error
  };
};
