import { onboardingService } from "@/services/api/onboardingService";
import { useCustomMutation } from "../../../hooks/useCustomMutation";
import { IOnboardingPayload } from "@/types/storage/IOnboarding";

interface IUseSavePersonalData {
  payload: Partial<IOnboardingPayload>;
  userUuid: string;
}

export const useSavePersonalData = () => {
  const mutation = useCustomMutation({
    mutationFn: ({ payload, userUuid }: IUseSavePersonalData) =>
      onboardingService.savePersonalData(payload, userUuid)
  });

  return {
    handle: mutation.mutateAsync,
    data: mutation.data,
    loading: mutation.isPending,
    error: mutation.error
  };
};
