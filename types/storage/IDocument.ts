export type DocumentType = "dni" | "cce" | "passport";

export interface IDocument {
  uuid: string;
  userUuid: string;
  documentType: DocumentType;
  documentNumber: string;
}
