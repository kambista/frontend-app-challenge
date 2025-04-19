import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import Header from '@/components/Header';
import Stepper from '@/components/Stepper';
import { TransactionStepper } from '@/constants/Steppers';
import { Octicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { Logger } from '@/utils/logger';
import SelectBankDrawer from '@/components/drawers/SelectBankDrawer';
import SelectSourceDrawer from '@/components/drawers/SelectSourceDrawer';
import SelectAccountDrawer from '@/components/drawers/SelectAccountDrawer';
import { Account, Bank, SourceFund } from '@/models';
import useTransaction from '@/hooks/useTransaction';
import CardContainer from '@/components/CardContainer';
import InfoCard from '@/components/InfoCard';

const History = () => {
  const [bank, setBank] = useState<Bank>();
  const [account, setAccount] = useState<Account>();
  const [sourceFund, setSourceFund] = useState<SourceFund>();

  const { calculatorRequest, calculatorResponse, completeTransaction, coupon } = useTransaction();

  const handleContinue = () => {
    if (!bank || !account || !sourceFund) return;
    completeTransaction(bank, account, sourceFund);
    navigateToTransfer();
  };

  const navigateToTransfer = () => {
    router.push('/(tabs)/home/transaction/transfer');
  };

  const { dismiss } = useBottomSheetModal();

  const bankDrawerRef = useRef<BottomSheetModal>(null);
  const handlePresentBankDrawer = () => bankDrawerRef.current?.present();
  const handleBankSelected = async (bank: Bank) => {
    setBank(bank);
    dismiss();
  };

  const sourceDrawerRef = useRef<BottomSheetModal>(null);
  const handlePresentSourceDrawer = () => sourceDrawerRef.current?.present();
  const handleSourceSelected = async (sourceFund: SourceFund) => {
    setSourceFund(sourceFund);
    dismiss();
  };

  const accountDrawerRef = useRef<BottomSheetModal>(null);
  const handlePresentAccountDrawer = () => accountDrawerRef.current?.present();
  const handleAccountSelected = async (account: Account) => {
    setAccount(account);
    dismiss();
  };

  return (
    <SafeAreaView className="min-h-screen">
      <SelectBankDrawer ref={bankDrawerRef} onBankAccountSelected={handleBankSelected} />
      <SelectSourceDrawer ref={sourceDrawerRef} onSourceFundSelected={handleSourceSelected} />
      <SelectAccountDrawer ref={accountDrawerRef} onAccountSelected={handleAccountSelected} />

      <ScrollView className="px-6 pt-6">
        <Header title="Completa los datos" />
        <View className="my-2" />

        <View className="w-[85%] self-center">
          <Stepper steps={TransactionStepper} />
        </View>

        <View className="my-3" />

        <CardContainer>
          <View className="flex flex-row justify-between">
            <Text className="font-mmedium text-gray-800">Tú envías</Text>
            <Text className="font-mbold text-black">
              {calculatorRequest?.originCurrency} {calculatorRequest?.amount}
            </Text>
          </View>
          <View className="flex flex-row justify-between">
            <Text className="font-mmedium text-gray-800">Tú recibes</Text>
            <Text className="font-mbold text-black">
              {calculatorRequest?.destinationCurrency} {calculatorResponse?.exchange}
            </Text>
          </View>
          <View className="flex flex-row justify-between">
            <Text className="font-mmedium text-gray-800">Cupón aplicado</Text>
            <Text className="font-mbold text-black">{coupon || '-'}</Text>
          </View>

          <View className="flex-1 h-px bg-gray-300 my-2" />

          <View className="flex flex-row justify-between">
            <Text className="font-mbold text-gray-800">Tipo de cambio utilizado</Text>
            <Text className="font-mbold text-black">{calculatorResponse?.rate}</Text>
          </View>
        </CardContainer>

        <View className="my-2" />

        <InfoCard content={'Tiempo estimado de espera **BCP, Interbank, BanBif, Pichincha:** 15 minutos. **Otros bancos:** 1 día hábil.'} />

        <View className="my-2" />

        <Text className="font-mmedium text-black mb-2">¿Desde qué banco nos envias tu dinero?</Text>
        <TouchableOpacity
          onPress={handlePresentBankDrawer}
          className="font-mmedium border border-gray-300 rounded-lg py-4 px-5 bg-white flex flex-row justify-between"
        >
          <Text className={`${bank ? 'font-msemibold' : 'font-mlight'}`}>{bank?.name || 'Selecciona'}</Text>
          <Octicons name="chevron-down" size={20} />
        </TouchableOpacity>

        <View className="my-4" />

        <Text className="font-mmedium text-black mb-2">¿En qué cuenta deseas recibir tu dinero?</Text>
        <TouchableOpacity
          onPress={handlePresentAccountDrawer}
          className="font-mmedium border border-gray-300 rounded-lg py-4 px-5 bg-white flex flex-row justify-between"
        >
          <Text className={`${account ? 'font-msemibold' : 'font-mlight'}`}>{account?.account_name || 'Selecciona'}</Text>
          <Octicons name="chevron-down" size={20} />
        </TouchableOpacity>

        <View className="my-2" />

        <InfoCard
          color="orange"
          content={'Recuerda que las cuentas deben estar **a tu nombre**. Kambista no transfiere a **cuentas de terceros**.'}
        />

        <View className="my-4" />

        <Text className="font-mmedium text-black mb-2">Origen de fondos</Text>
        <TouchableOpacity
          onPress={handlePresentSourceDrawer}
          className="font-mmedium border border-gray-300 rounded-lg py-4 px-5 border-gray-300 bg-white flex flex-row justify-between"
        >
          <Text className={`${sourceFund ? 'font-msemibold' : 'font-mlight'}`}>{sourceFund?.name || 'Selecciona'}</Text>
          <Octicons name="chevron-down" size={20} />
        </TouchableOpacity>

        <View className="my-4" />

        <TouchableOpacity onPress={handleContinue} className="w-full py-5 rounded-xl bg-primary">
          <Text className="text-center text-lg font-msemibold">CONTINUAR</Text>
        </TouchableOpacity>

        <View className="my-16" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default History;
