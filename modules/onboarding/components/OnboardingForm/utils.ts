import { DocumentType } from "@/types/storage/IDocument";
import { IGenericSelectOption, ISelectOption } from "@/types/utils/options";
import { OnboardingFormTypes } from "./types";

export const defaultValues: OnboardingFormTypes = {
  name: "",
  documentType: "",
  documentNumber: "",
  phone: "",
  birthDate: "",
  previousCompany: "",
  acceptTerms: false,
  acceptPolicy: false
};

export const documentTypes: IGenericSelectOption<DocumentType>[] = [
  { label: "DNI", value: "dni" },
  { label: "CCE", value: "cce" },
  { label: "Pasaporte", value: "passport" }
];

export const previousCompanies: ISelectOption[] = [
  { label: "Banco", value: "bank" },
  { label: "Cambistas informales", value: "informal" },
  { label: "Casa de cambio", value: "exchangeHouse" },
  { label: "Financieras", value: "financial" },
  { label: "Otros", value: "others" }
];
