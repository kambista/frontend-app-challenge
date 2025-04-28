import MockAdapter from 'axios-mock-adapter';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './client';
import banks from '../mocks/bankAccounts.json';
import sourceFunds from '../mocks/sourceFunds.json';

const mock = new MockAdapter(api, {
  delayResponse: 500,
  onNoMatch: 'passthrough',
});

const DEMO_EMAIL = 'ejemplo@mail.com';
const DEMO_PASS = 'Contraseña123';

interface User {
  id: string;
  name: string;
  documentNumber: string;
  email: string;
  password: string;
}

let users: User[] = [];

(async () => {
  const json = await AsyncStorage.getItem('mockUsers');
  users = json ? JSON.parse(json) : [];
})();

mock.onPost('onboarding/register').reply(async (config) => {
  const payload = JSON.parse(config.data);
  const duplicateDNI = users.some(
    (u) => u.documentNumber === payload.documentNumber,
  );

  if (duplicateDNI) {
    return [
      200,
      {
        success: false,
        data: {
          name: 'DUPLICATE_DNI',
          title: 'DNI en uso',
          message: 'El número de documento ya está en uso.',
        },
      },
    ];
  }

  const firstName = (payload.name ?? payload.firstName ?? 'usuario')
    .split(' ')[0]
    .toLowerCase();
  const email = `${firstName}@mail.com`;

  const newUser: User = {
    id: uuidv4(),
    name: payload.name ?? `${firstName}`,
    documentNumber: payload.documentNumber,
    email,
    password: DEMO_PASS,
  };

  users.push(newUser);
  await AsyncStorage.setItem('mockUsers', JSON.stringify(users));

  return [
    200,
    {
      success: true,
      data: {
        userId: newUser.id,
        token: 'fake-jwt-token',
        email: newUser.email,
        password: DEMO_PASS,
      },
    },
  ];
});

mock.onPost('auth/login').reply(async (config) => {
  const { email, password } = JSON.parse(config.data);

  if (email === DEMO_EMAIL && password === DEMO_PASS) {
    return [
      200,
      {
        success: true,
        data: {
          userId: 'demo-id',
          token: 'fake-jwt-token-demo',
          user: { name: 'Usuario Demo', email },
        },
      },
    ];
  }

  const found = users.find((u) => u.email === email && u.password === password);

  if (found) {
    return [
      200,
      {
        success: true,
        data: {
          userId: found.id,
          token: 'fake-jwt-token-' + Math.random().toString(36).substring(2),
          user: { name: found.name, email: found.email },
        },
      },
    ];
  }

  return [
    200,
    {
      success: false,
      data: {
        name: 'INVALID_CREDENTIALS',
        title: 'Credenciales incorrectas',
        message: 'El correo electrónico o la contraseña son incorrectos.',
      },
    },
  ];
});

mock.onGet('/catalog/banks').reply(200, banks);
mock.onGet('/catalog/sources-fund').reply(200, sourceFunds);

interface Wallet {
  id: string;
  alias: string;
  number: string;
}

let wallets: Wallet[] = [
  { id: '1', alias: 'Alias · Scotiabank · PEN', number: '******4444' },
  { id: '2', alias: 'Alias · BCP · PEN', number: '******8888' },
];

(async () => {
  const json = await AsyncStorage.getItem('mockWallets');
  if (json) wallets = JSON.parse(json);
})();

mock.onGet('/user/wallets').reply(200, wallets);

mock.onPost('/user/wallets').reply(async (config) => {
  const payload = JSON.parse(config.data);
  const newWallet: Wallet = {
    id: uuidv4(),
    alias: payload.alias,
    number: `******${payload.number.slice(-4)}`,
  };
  wallets.push(newWallet);
  await AsyncStorage.setItem('mockWallets', JSON.stringify(wallets));
  return [200, newWallet];
});

export default mock;
