export interface IOnboarding {
  uuid: string;
  userUuid: string;
  name: string;
  birthDate: string;
  previousCompany: string;
  acceptTerms: boolean;
  acceptPolicy: boolean;
}

export interface IOnboardingPayload {
  name: string;
  birthDate: string;
  previousCompany: string;
  acceptTerms: boolean;
  acceptPolicy: boolean;
}
