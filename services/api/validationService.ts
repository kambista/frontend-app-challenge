import { IErrorResponse, IResponse } from "@/types/utils/requests";
import { storageInitializer } from "../storage/storageInitializer";
import { DocumentType } from "@/types/storage/IDocument";

class ValidationService {
  private static instance: ValidationService;

  static getInstance() {
    if (!ValidationService.instance)
      ValidationService.instance = new ValidationService();
    return ValidationService.instance;
  }

  async validatePhone(
    phoneNumber: string
  ): Promise<IResponse<{}> | IErrorResponse> {
    await this.simulateDelay();

    const phones = await storageInitializer.getPhones();
    const phoneInUse = phones.some((phone) => phone.phone === phoneNumber);

    if (phoneInUse) {
      const error: IErrorResponse = {
        success: false,
        data: {
          name: "INVALID_PHONE",
          title: "Número en uso",
          message: "Este número de teléfono ya está registrado."
        }
      };
      throw error;
    }

    return { success: true };
  }

  async validateDocument(
    type: DocumentType,
    number: string
  ): Promise<IResponse<{}> | IErrorResponse> {
    await this.simulateDelay();

    const documents = await storageInitializer.getDocuments();
    const documentInUse = documents.some(
      (document) =>
        document.documentType === type && document.documentNumber === number
    );

    if (documentInUse) {
      const error: IErrorResponse = {
        success: false,
        data: {
          name: "DUPLICATE_DNI",
          title: "Documento en uso",
          message: "Este documento ya está registrado."
        }
      };
      throw error;
    }

    return { success: true };
  }

  private async simulateDelay() {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

export const validationService = ValidationService.getInstance();
