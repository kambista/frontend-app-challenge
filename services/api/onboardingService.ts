import { IOnboarding, IOnboardingPayload } from "@/types/storage/IOnboarding";
import { IErrorResponse, IResponse } from "@/types/utils/requests";
import { STORAGE_KEYS } from "@/utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

class OnboardingService {
  private static instance: OnboardingService;

  static getInstance() {
    if (!OnboardingService.instance)
      OnboardingService.instance = new OnboardingService();
    return OnboardingService.instance;
  }

  async savePersonalData(
    data: Partial<IOnboardingPayload>,
    userUuid: string
  ): Promise<IResponse<Partial<IOnboarding>> | IErrorResponse> {
    try {
      const id = uuid.v4();
      const payload: Partial<IOnboarding> = {
        ...data,
        uuid: id,
        userUuid
      };

      await AsyncStorage.setItem(
        STORAGE_KEYS.ONBOARDING_DATA_KEY,
        JSON.stringify(payload)
      );

      return {
        success: true,
        data: payload
      };
    } catch (error) {
      return {
        success: false,
        data: {
          name: "ONBOARDING_SAVE_ERROR",
          title: "Error al guardar datos",
          message: "No se pudieron guardar los datos de onboarding."
        }
      };
    }
  }
}

export const onboardingService = OnboardingService.getInstance();
