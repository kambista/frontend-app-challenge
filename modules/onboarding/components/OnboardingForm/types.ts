import { DocumentType } from "@/types/storage/IDocument";

export type OnboardingFormTypes = {
  name: string;
  documentType: DocumentType | string;
  documentNumber: string;
  phone: string;
  birthDate: string;
  previousCompany?: string;
  acceptTerms: boolean;
  acceptPolicy: boolean;
};
