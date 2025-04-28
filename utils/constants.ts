import { ExternalPathString } from "expo-router";

export const STORAGE_KEYS = {
  AUTH: "auth-storage",
  USERS_KEY: "registered-users",
  PHONES_KEY: "registered-phones",
  DOCUMENTS_KEY: "registered-documents",
  ONBOARDING_DATA_KEY: "onboarding-data",
  BANK_ACCOUNTS_KEY: "bank-accounts"
};

export const REDIRECT_URLS: Record<string, ExternalPathString> = {
  REGISTER: "https://app.kambista.com/registro/datos-perfil",
  FORGOT_PASSWORD: "https://app.kambista.com/recuperar-contrasena"
};
