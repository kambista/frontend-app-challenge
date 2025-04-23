import MockAdapter from 'axios-mock-adapter';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './client';

const mock = new MockAdapter(api, { delayResponse: 500 });

let users: any[] = [];
(async () => {
  const json = await AsyncStorage.getItem('mockUsers');
  users = json ? JSON.parse(json) : [];
})();

mock.onPost('/onboarding/register').reply(async (config) => {
  const payload = JSON.parse(config.data);
  if (users.some((u) => u.documentNumber === payload.documentNumber)) {
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
  users.push(payload);
  await AsyncStorage.setItem('mockUsers', JSON.stringify(users));
  return [
    200,
    {
      success: true,
      data: {
        userId: uuidv4(),
        token: 'fake-jwt-token',
      },
    },
  ];
});
