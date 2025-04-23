import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Images from '@/constants/Images';
import { Picker } from '@react-native-picker/picker';
import { router, useFocusEffect } from 'expo-router';
import { Logger } from '@/utils/logger';
import ExchangeService from '@/services/exchangeService';
import { CalculatorRequest, ExchangeRateResponse } from '@/models/dto/exchangeDTO';
import { Octicons } from '@expo/vector-icons';
import { Coupons, Currencies } from '@/constants/Backend';
import useUI from '@/hooks/useUI';
import useTransaction from '@/hooks/useTransaction';
import { ShowInfo, ShowSuccess } from '@/utils/toast';

const Home = () => {
  const currencies = Currencies;
  const [exchangeRate, setExchangeRate] = useState<ExchangeRateResponse>();
  const [originCurrency, setOriginCurrency] = useState(currencies[0].code);
  const [destinationCurrency, setDestinationCurrency] = useState(currencies[1].code);
  const [amount, setAmount] = useState('100');
  const [coupon, setCoupon] = useState<string>('');

  const [isCouponValid, setIsCouponValid] = useState<boolean | undefined>(undefined);

  const { forceShowTabBar } = useUI();
  const { startTransaction, calculatorResponse, setCoupon: setCouponStore } = useTransaction();

  const fetchExchangeRate = async () => {
    try {
      const data = await ExchangeService.getExchangeRate();
      return data;
    } catch (error) {
      Logger.error(error);
    }
  };

  const calculate = async () => {
    try {
      const payload: CalculatorRequest = {
        originCurrency: originCurrency,
        destinationCurrency: destinationCurrency,
        amount: Number(amount) || 0,
        active: 'S',
      };
      const data = await ExchangeService.calculate(payload);
      startTransaction(payload, data);
    } catch (error) {
      Logger.log(error);
    }
  };

  const validateCoupon = () => {
    if(Coupons.includes(coupon)) {
      setIsCouponValid(true);
      setCouponStore(coupon)
      ShowSuccess('Cupón válido', 'El cupón es válido')
    }
  };

  const switchCurrency = async () => {
    const new_amount = calculatorResponse?.exchange.toString() || '10';
    setAmount(new_amount);
    setOriginCurrency(destinationCurrency);
    setDestinationCurrency(originCurrency);
    await calculate();
  };

  const changeCurrency = async (type: 'destination' | 'origin', desiredCurrency: string) => {
    switch (type) {
      case 'origin':
        if (destinationCurrency == desiredCurrency) {
          setOriginCurrency(destinationCurrency);
          setDestinationCurrency(originCurrency);
          break;
        }
        setOriginCurrency(desiredCurrency);
        break;
      case 'destination':
        if (originCurrency == desiredCurrency) {
          setOriginCurrency(destinationCurrency);
          setDestinationCurrency(originCurrency);
          break;
        }
        setDestinationCurrency(desiredCurrency);
        break;
    }
  };

  const handleStartTransaction = () => {
    if (!startTransaction) return;
    navigateToTransaction();
  };

  const navigateToTransaction = () => {
    router.push('/(tabs)/home/transaction/complete');
  };

  const workingOnIt = () => {
    ShowInfo('🚧 Función en desarrollo', 'Esta funcionalidad estará disponible próximamente.');
  };

  forceShowTabBar();

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const temp_exchange_rate = await fetchExchangeRate();
        setExchangeRate(temp_exchange_rate);
        calculate();
      };
      fetchData();
    }, [])
  );

  useEffect(() => {
    calculate();
  }, [originCurrency, destinationCurrency, amount]);

  if (!calculatorResponse) return <></>;

  return (
    <SafeAreaView className="min-h-screen">
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <ScrollView className="px-6">
          <View className="my-2" />

          <View className="justify-center items-center">
            <Image source={Images.Logo} className="w-44" resizeMode="contain" />
          </View>

          <View className="flex flex-row">
            <TouchableOpacity
              onPress={() => {
                ShowInfo('😖 No sé que funcionalidad tiene', 'El figma no lo detalla :c.');
              }}
              className="bg-black h-14 flex flex-1 justify-center rounded-t-xl"
            >
              <Text className="font-mbold text-white self-center">Compra: {exchangeRate?.ask}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                ShowInfo('😖 No sé que funcionalidad tiene', 'El figma no lo detalla :c.');
              }}
              className="bg-white h-14 flex flex-1 justify-center rounded-t-xl"
            >
              <Text className="font-mbold text-gray-400 self-center">Venta: {exchangeRate?.bid}</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-white rounded-b-xl px-4">
            <View className="relative">
              <TouchableOpacity
                onPress={switchCurrency}
                className="absolute w-12 aspect-square bg-white rounded-full flex items-center justify-center z-10 top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 "
              >
                <Octicons name="arrow-switch" size={20} />
              </TouchableOpacity>

              <View className="flex flex-row mt-5">
                <View className="flex-1 bg-gray-200 rounded-l-xl pl-5 py-2">
                  <Text className="font-mmedium">¿Cuánto envías?</Text>
                  <TextInput
                    keyboardType="numeric"
                    className="font-mbold text-xl pl-3 py-1"
                    value={amount}
                    onChangeText={(text) => {
                      setAmount(text);
                      calculate();
                    }}
                    onBlur={() => calculate()}
                    placeholder="0.00"
                  />
                </View>
                <View className="w-36 bg-black rounded-r-xl">
                  <Picker
                    selectedValue={originCurrency}
                    onValueChange={(value) => changeCurrency('origin', value)}
                    style={{ height: 70, color: 'white' }}
                    dropdownIconColor="white"
                  >
                    {currencies.map((cur) => (
                      <Picker.Item key={cur.id} label={cur.name} value={cur.code} />
                    ))}
                  </Picker>
                </View>
              </View>

              <View className="flex flex-row my-5">
                <View className="flex-1 bg-gray-200 rounded-l-xl pl-5 py-2">
                  <Text className="font-mmedium">Entonces recibes</Text>
                  <Text className="font-mbold text-xl pl-3 h-8">{calculatorResponse?.exchange || 0}</Text>
                </View>
                <View className="w-36 bg-black rounded-r-xl">
                  <Picker
                    selectedValue={destinationCurrency}
                    onValueChange={(value) => changeCurrency('destination', value)}
                    style={{ height: 70, color: 'white' }}
                    dropdownIconColor="white"
                  >
                    {currencies.map((cur) => (
                      <Picker.Item key={cur.id} label={cur.name} value={cur.code} />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>

            <View className="flex flex-row justify-between mb-6">
              <Text className="font-mmedium">
                Ahorro estimado:{'\n'}
                {calculatorResponse?.savings.currency || ''} {calculatorResponse?.savings.amount || 0}
              </Text>
              <Text className="font-mmedium">
                Koinks:{'\n'}
                10
              </Text>
            </View>

            <View className="flex flex-row mb-2">
              <TextInput
                className={`font-mmedium border border-gray-300 rounded-l-xl py-4 pl-5 flex-1 text-center`}
                placeholder="Ingresa el cupón"
                onChangeText={(text) => setCoupon(text.toUpperCase())}
                value={coupon}
                autoCapitalize="characters" // Para que automáticamente capitalice las letras
              />
              <TouchableOpacity onPress={validateCoupon} className="bg-black flex items-center justify-center rounded-r-xl">
                <Text className="text-base font-mmedium text-white px-4">APLICAR</Text>
              </TouchableOpacity>
            </View>

            {isCouponValid != undefined && (
              <Text className={`text-base font-mmedium self-center mb-4 ${isCouponValid ? 'text-green-500' : 'text-red-500'}`}>
                {isCouponValid ? 'Cupón Válido' : 'Cupón Inválido'}
              </Text>
            )}

            <View className="w-full flex flex-row items-center px-4 my-6">
              <Octicons name="star-fill" size={22} color={'#05e2c3'} />
              <View className="pl-4">
                <Text className="text-sm font-mmedium self-center">¿Monto mayor a $5.000 o S/18.000?</Text>
                <TouchableOpacity onPress={workingOnIt}>
                  <Text className="text-sm font-mbold underline self-center">¡Obtén un Tipo de Cambio Preferencial!</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className="my-2" />

          <TouchableOpacity onPress={handleStartTransaction} className="w-full py-5 rounded-xl bg-primary">
            <Text className="text-center text-lg font-msemibold">INICIAR OPERACIÓN</Text>
          </TouchableOpacity>

          <View className="my-12" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Home;
