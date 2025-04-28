import { useCustomMutation } from "@/hooks/useCustomMutation";
import { storageInitializer } from "@/services/storage/storageInitializer";

import { DocumentType } from "@/types/storage/IDocument";

export interface IUseCreateDocument {
  userUuid: string;
  documentType: DocumentType;
  documentNumber: string;
}

export const useCreateDocument = () => {
  const mutation = useCustomMutation({
    mutationFn: ({
      userUuid,
      documentType,
      documentNumber
    }: IUseCreateDocument) =>
      storageInitializer.addDocument(documentType, documentNumber, userUuid)
  });

  return {
    handle: mutation.mutateAsync,
    data: mutation.data,
    loading: mutation.isPending,
    error: mutation.error
  };
};
