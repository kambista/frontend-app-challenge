import { storageInitializer } from "@/services/storage/storageInitializer";
import { useCustomMutation } from "../../../hooks/useCustomMutation";

interface IUseCreatePhone {
  phoneNumber: string;
  userUuid: string;
}

export const useCreatePhone = () => {
  const mutation = useCustomMutation({
    mutationFn: ({ phoneNumber, userUuid }: IUseCreatePhone) =>
      storageInitializer.addPhone(phoneNumber, userUuid)
  });

  return {
    handle: mutation.mutateAsync,
    data: mutation.data,
    loading: mutation.isPending,
    error: mutation.error
  };
};
