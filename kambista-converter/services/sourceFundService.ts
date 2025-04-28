import { api } from '../api/client';

export interface SourceFund {
  _id: string;
  name: string;
  alias?: string;
}

export const getSourceFunds = async (): Promise<SourceFund[]> => {
  const { data } = await api.get<SourceFund[]>('/catalog/sources-fund');
  return data;
};

export const getSourceFundById = async (
  id: string,
): Promise<SourceFund | undefined> => {
  const funds = await getSourceFunds();
  return funds.find((f) => f._id === id);
};
