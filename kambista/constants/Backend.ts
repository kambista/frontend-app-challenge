import { Account, Bank, Currency, SourceFund, User } from '@/models';

export const Currencies: Currency[] = [
  {
    id: 0,
    code: 'USD',
    name: 'Dólar',
  },
  {
    id: 1,
    code: 'PEN',
    name: 'Sol',
  },
];

export const BankAccounts: Bank[] = [
  {
    name: 'Banco de Crédito del Perú',
    alias: 'BCP',
    id: '1',
  },
  {
    name: 'Banco Internacional del Perú',
    alias: 'Interbank',
    id: '2',
  },
  {
    name: 'BBVA Continental',
    alias: 'BBVA',
    id: '3',
  },
  {
    name: 'BanBif',
    alias: 'BanBif',
    id: '4',
  },
  {
    name: 'Scotiabank',
    alias: 'Scotiabank',
    id: '5',
  },
  {
    name: 'Banco Falabella',
    alias: 'Falabella',
    id: '6',
  },
  {
    name: 'Banco Pichincha',
    alias: 'Pichincha',
    id: '7',
  },
  {
    name: 'Banco de Comercio',
    alias: 'Bancomercio',
    id: '8',
  },
  {
    name: 'Citibank Perú',
    alias: 'Citibank',
    id: '9',
  },
  {
    name: 'Mi Banco',
    alias: 'Mibanco',
    id: '10',
  },
  {
    name: 'Banco GNB',
    alias: 'GNB',
    id: '11',
  },
  {
    name: 'Banco Ripley',
    alias: 'Ripley',
    id: '12',
  },
  {
    name: 'Banco de la Nación',
    alias: 'Nacion',
    id: '13',
  },
  {
    name: 'Otro',
    alias: 'Otro',
    id: '14',
  },
];

export const SourceFunds: SourceFund[] = [
  {
    _id: '1',
    name: 'Ahorros',
  },
  {
    _id: '2',
    name: 'Donación/Sorteo',
  },
  {
    _id: '3',
    name: 'Venta de bien mueble',
  },
  {
    _id: '4',
    name: 'Venta de bien inmueble',
  },
  {
    _id: '5',
    name: 'Herencia',
  },
  {
    _id: '6',
    name: 'Préstamos',
  },
];

export const Accounts: Account[] = [
  {
    id: '1',
    entity: 'Scotiabank',
    currency: 'PEN',
    account_number: '123412341234',
    account_name: 'Scotiabank',
  },
  {
    id: '2',
    entity: 'Banco de la Nación',
    currency: 'PEN',
    account_number: '123412341234',
    account_name: 'BCP',
  },
];

export const Coupons = ['EDU', 'FREE', 'ABC'];

export const Users: User[] = [
  {
    id: 1,
    email: 'edu@gmail.com',
    password: '12345678',
  },
  {
    id: 2,
    email: 'ejemplo@gmail.com',
    password: '12345678',
  },
];
