import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React, { useCallback, useState } from 'react';
import Images from '@/constants/Images';
import { Picker } from '@react-native-picker/picker';
import { router, useFocusEffect } from 'expo-router';
import { Logger } from '@/utils/logger';
import ExchangeService from '@/services/exchangeService';
import { CalculatorRequest, CalculatorResponse, ExchangeRateResponse } from '@/models/dto/exchangeDTO';
import { Octicons } from '@expo/vector-icons';
import { Currencies } from '@/constants/Backend';

const Home = () => {
  const currencies = Currencies;
  const [exchangeRate, setExchangeRate] = useState<ExchangeRateResponse>();
  const [originCurrency, setOriginCurrency] = useState(currencies[0].code);
  const [destinationCurrency, setDestinationCurrency] = useState(currencies[1].code);
  const [amount, setAmount] = useState('100');
  const [result, setResult] = useState<CalculatorResponse>();

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
      setResult(data);
    } catch (error) {
      Logger.log(error);
    }
  };

  const switchCurrency = async () => {
    const previous_currency = originCurrency;
    setOriginCurrency(destinationCurrency);
    setDestinationCurrency(previous_currency);
    calculate();
  };

  const changeCurrency = async (type: 'destination' | 'origin', desiredCurrency: string) => {
    switch (type) {
      case 'origin':
        if (destinationCurrency == desiredCurrency) {
          switchCurrency();
          break;
        }
        setOriginCurrency(desiredCurrency);
        calculate();
        break;
      case 'destination':
        if (originCurrency == desiredCurrency) {
          switchCurrency();
          break;
        }
        setDestinationCurrency(desiredCurrency);
        calculate();
        break;
    }
  };

  const navigateToTransaction = () => {
    router.push('/(tabs)/home/transaction');
  };

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

  if (!result) return <></>;

  return (
    <SafeAreaView className="min-h-screen">
      <ScrollView className="px-6 py-2">
        <View className="my-2" />

        <View className="justify-center items-center">
          <Image source={Images.Logo} className="w-44" resizeMode="contain" />
        </View>

        <View className="flex flex-row">
          <TouchableOpacity className="bg-black h-14 flex flex-1 justify-center rounded-t-xl">
            <Text className="font-mbold text-white self-center">Compra: {exchangeRate?.ask}</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white h-14 flex flex-1 justify-center rounded-t-xl">
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
                  }}
                  onBlur={() => calculate()}
                  placeholder="0.00"
                />
              </View>
              <Picker
                selectedValue={originCurrency}
                onValueChange={(value) => changeCurrency('origin', value)}
                style={{
                  width: 120,
                  backgroundColor: 'black',
                  color: 'white', // Texto blanco para contraste
                }}
                dropdownIconColor="white" // Color del ícono del dropdown
              >
                {currencies.map((cur) => (
                  <Picker.Item key={cur.id} label={cur.name} value={cur.code} />
                ))}
              </Picker>
            </View>

            <View className="flex flex-row my-5">
              <View className="flex-1 bg-gray-200 rounded-l-xl pl-5 py-2">
                <Text className="font-mmedium">Entonces recibes</Text>
                <Text className="font-mbold text-xl pl-3 h-8">{result?.exchange || 0}</Text>
              </View>
              <Picker
                selectedValue={destinationCurrency}
                onValueChange={(value) => changeCurrency('destination', value)}
                style={{
                  width: 120,
                  backgroundColor: 'black',
                  color: 'white', // Texto blanco para contraste
                }}
                dropdownIconColor="white" // Color del ícono del dropdown
              >
                {currencies.map((cur) => (
                  <Picker.Item key={cur.id} label={cur.name} value={cur.code} />
                ))}
              </Picker>
            </View>
          </View>

          <View className="flex flex-row justify-between mb-6">
            <Text className="font-mmedium">
              Ahorro estimado:{'\n'}
              {result?.savings.currency || ''} {result?.savings.amount || 0}
            </Text>
            <Text className="font-mmedium">
              Koinks:{'\n'}
              10
            </Text>
          </View>

          <View className="flex flex-row mb-6">
            <TextInput
              className={`font-mmedium border border-gray-300 rounded-l-xl py-4 pl-5 flex-1 text-center`}
              placeholder="Ingresa el cupón"
              // onChangeText={handleChange('coupon')}
              // value={values.coupon}
            />
            <TouchableOpacity className="bg-black flex items-center justify-center rounded-r-xl">
              <Text className="text-base font-mmedium text-white px-4">APLICAR</Text>
            </TouchableOpacity>
          </View>

          <Text className="text-base font-mmedium self-center">¿Monto mayor a $5.000 o S/18.000?</Text>
          <Text className="text-base font-mbold underline self-center">¡Obtén un Tipo de Cambio Preferencial!</Text>
          <View className="my-2" />
        </View>

        <View className="my-2" />

        <TouchableOpacity onPress={navigateToTransaction} className="w-full py-5 rounded-xl bg-primary">
          <Text className="text-center text-lg font-msemibold">INICIAR OPERACIÓN</Text>
        </TouchableOpacity>

        <View className="my-12" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
