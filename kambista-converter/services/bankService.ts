import { api } from '../api/client';

export interface Bank {
  id: string;
  name: string;
  alias: string;
}

export const getBanks = async (): Promise<Bank[]> => {
  const { data } = await api.get<Bank[]>('/catalog/banks');
  return data;
};

export const getBankById = async (id: string): Promise<Bank | undefined> => {
  const banks = await getBanks();
  return banks.find((b) => b.id === id);
};
