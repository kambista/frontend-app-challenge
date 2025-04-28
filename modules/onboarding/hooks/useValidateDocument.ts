import { useCustomMutation } from "@/hooks/useCustomMutation";
import { validationService } from "@/services/api/validationService";
import { DocumentType } from "@/types/storage/IDocument";

interface IUseValidateDocument {
  documentType: DocumentType;
  documentNumber: string;
}

export const useValidateDocument = () => {
  const mutation = useCustomMutation({
    mutationFn: ({ documentType, documentNumber }: IUseValidateDocument) =>
      validationService.validateDocument(documentType, documentNumber)
  });

  return {
    handle: mutation.mutateAsync,
    data: mutation.data,
    loading: mutation.isPending,
    error: mutation.error
  };
};
