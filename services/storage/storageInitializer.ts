import { STORAGE_KEYS } from "@/utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import initialUsers from "@/mocks/users.json";
import { IPhone } from "@/types/storage/IPhone";
import { IUser } from "@/types/storage/IUser";
import { DocumentType, IDocument } from "@/types/storage/IDocument";
import uuid from "react-native-uuid";
import { log } from "@/utils/logger";

class StorageInitializer {
  private static instance: StorageInitializer;

  static getInstance() {
    if (!StorageInitializer.instance) {
      StorageInitializer.instance = new StorageInitializer();
    }
    return StorageInitializer.instance;
  }

  async initializeData() {
    await Promise.all([
      this.initializeUsers(),
      this.initializePhones(),
      this.initializeDocuments()
    ]);
  }

  private async initializeUsers() {
    try {
      const usersRaw = await AsyncStorage.getItem(STORAGE_KEYS.USERS_KEY);

      if (!usersRaw) {
        await AsyncStorage.setItem(
          STORAGE_KEYS.USERS_KEY,
          JSON.stringify(initialUsers)
        );
        log.info("Usuarios inicializados correctamente");
      } else {
        log.info("Usuarios ya existentes, no se inicializaron nuevos");
      }
    } catch (error) {
      log.error("Error al inicializar usuarios:", error);
    }
  }

  private async initializePhones() {
    try {
      const phonesRaw = await AsyncStorage.getItem(STORAGE_KEYS.PHONES_KEY);

      if (!phonesRaw) {
        await AsyncStorage.setItem(STORAGE_KEYS.PHONES_KEY, JSON.stringify([]));
        log.info("Teléfonos inicializados correctamente");
      } else {
        log.info("Teléfonos ya existentes, no se inicializaron nuevos");
      }
    } catch (error) {
      log.error("Error al inicializar teléfonos:", error);
    }
  }

  private async initializeDocuments() {
    try {
      const documentsRaw = await AsyncStorage.getItem(
        STORAGE_KEYS.DOCUMENTS_KEY
      );

      if (!documentsRaw) {
        await AsyncStorage.setItem(
          STORAGE_KEYS.DOCUMENTS_KEY,
          JSON.stringify([])
        );
        log.info("Documentos inicializados correctamente");
      } else {
        log.info("Documentos ya existentes, no se inicializaron nuevos");
      }
    } catch (error) {
      log.error("Error al inicializar documentos:", error);
    }
  }

  async getPhones(): Promise<IPhone[]> {
    try {
      const phonesRaw = await AsyncStorage.getItem(STORAGE_KEYS.PHONES_KEY);
      return phonesRaw ? JSON.parse(phonesRaw) : [];
    } catch (error) {
      log.error("Error al obtener teléfonos:", error);
      return [];
    }
  }

  async getUsers(): Promise<IUser[]> {
    try {
      const usersRaw = await AsyncStorage.getItem(STORAGE_KEYS.USERS_KEY);
      return usersRaw ? JSON.parse(usersRaw) : [];
    } catch (error) {
      log.error("Error al obtener usuarios:", error);
      return [];
    }
  }

  async getDocuments(): Promise<IDocument[]> {
    try {
      const documentsRaw = await AsyncStorage.getItem(
        STORAGE_KEYS.DOCUMENTS_KEY
      );
      return documentsRaw ? JSON.parse(documentsRaw) : [];
    } catch (error) {
      log.error("Error al obtener documentos:", error);
      return [];
    }
  }

  async addPhone(phoneNumber: string, userUuid: string) {
    try {
      const id = uuid.v4();
      const payload: IPhone = {
        uuid: id,
        userUuid,
        phone: phoneNumber
      };

      const phones = await this.getPhones();
      phones.push(payload);
      await AsyncStorage.setItem(
        STORAGE_KEYS.PHONES_KEY,
        JSON.stringify(phones)
      );
    } catch (error) {
      log.error("Error al agregar teléfono:", error);
    }
  }

  async addDocument(
    documentType: DocumentType,
    documentNumber: string,
    userUuid: string
  ) {
    try {
      const id = uuid.v4();
      const payload: IDocument = {
        uuid: id,
        userUuid,
        documentType,
        documentNumber
      };

      const documents = await this.getDocuments();
      documents.push(payload);
      await AsyncStorage.setItem(
        STORAGE_KEYS.DOCUMENTS_KEY,
        JSON.stringify(documents)
      );
    } catch (error) {
      log.error("Error al agregar documento:", error);
    }
  }
}

export const storageInitializer = StorageInitializer.getInstance();
