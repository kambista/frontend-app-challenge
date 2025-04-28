import { Account } from '../components/ui/AccountPicker';

export interface Wallet extends Account {}

let cache: Wallet[] = [
  { id: '1', alias: 'Alias - Scotiabank - PEN', number: '******4444' },
  { id: '2', alias: 'Alias - BCP - PEN', number: '******8888' },
];

export async function getUserAccounts(): Promise<Wallet[]> {
  return new Promise((resolve) => setTimeout(() => resolve([...cache]), 200));
}
export async function createUserWallet(payload: {
  alias: string;
  number: string;
  type: 'Ahorros' | 'Corriente';
  bankId: string;
  currency: 'PEN' | 'USD';
}): Promise<Wallet> {
  const newWallet: Wallet = {
    id: Date.now().toString(),
    alias: payload.alias,
    number: `******${payload.number.slice(-4)}`,
  };
  cache.push(newWallet);
  return new Promise((resolve) => setTimeout(() => resolve(newWallet), 200));
}
