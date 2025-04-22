import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Header from '@/components/Header';
import Stepper from '@/components/Stepper';
import { TransactionStepper } from '@/constants/Steppers';
import { Octicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import SelectBankDrawer from '@/components/drawers/SelectBankDrawer';
import SelectSourceDrawer from '@/components/drawers/SelectSourceDrawer';
import SelectAccountDrawer from '@/components/drawers/SelectAccountDrawer';
import useTransaction from '@/hooks/useTransaction';
import CardContainer from '@/components/CardContainer';
import InfoCard from '@/components/InfoCard';
import { Account, Bank, SourceFund } from '@/models';

// Esquema de validación
const validationSchema = Yup.object().shape({
  bank: Yup.object().required('Selecciona un banco'),
  account: Yup.object().required('Selecciona una cuenta'),
  sourceFund: Yup.object().required('Selecciona el origen de fondos'),
});

const Complete = () => {
  const { calculatorRequest, calculatorResponse, completeTransaction, coupon } = useTransaction();
  const { dismiss } = useBottomSheetModal();

  // Refs para los drawers
  const bankDrawerRef = useRef<BottomSheetModal>(null);
  const sourceDrawerRef = useRef<BottomSheetModal>(null);
  const accountDrawerRef = useRef<BottomSheetModal>(null);

  // Formik
  const formik = useFormik({
    initialValues: {
      bank: undefined,
      account: undefined,
      sourceFund: undefined,
    },
    validationSchema,
    onSubmit: (values) => {
      completeTransaction(values.bank, values.account, values.sourceFund);
      router.push('/(tabs)/home/transaction/transfer');
    },
  });

  // Handlers para selección en drawers
  const handleBankSelected = (bank : Bank) => {
    formik.setFieldValue('bank', bank);
    dismiss();
  };

  const handleAccountSelected = (account : Account) => {
    formik.setFieldValue('account', account);
    dismiss();
  };

  const handleSourceSelected = (sourceFund : SourceFund) => {
    formik.setFieldValue('sourceFund', sourceFund);
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
            <View className='flex flex-row items-center gap-2'>
              {coupon && <Text className="font-mbold text-red-500 line-through">{calculatorResponse?.rate}</Text>}
              <Text className="font-mbold text-black">{calculatorResponse?.rate}</Text>
            </View>
          </View>
        </CardContainer>

        <View className="my-2" />

        <InfoCard content={'Tiempo estimado de espera **BCP, Interbank, BanBif, Pichincha:** 15 minutos. **Otros bancos:** 1 día hábil.'} />

        {/* Banco */}
        <View className="my-2" />
        <Text className="font-mmedium text-black mb-2">¿Desde qué banco nos envias tu dinero?</Text>
        <TouchableOpacity
          onPress={() => bankDrawerRef.current?.present()}
          className={`font-mmedium border rounded-lg py-4 px-5 bg-white flex flex-row justify-between ${
            formik.touched.bank && formik.errors.bank ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <Text className={formik.values.bank ? 'font-msemibold' : 'font-mlight'}>
            {formik.values.bank?.name || 'Selecciona'}
          </Text>
          <Octicons name="chevron-down" size={20} />
        </TouchableOpacity>
        {formik.touched.bank && formik.errors.bank && (
          <Text className="text-red-500 text-xs mt-1 font-mmedium">{formik.errors.bank}</Text>
        )}

        {/* Cuenta */}
        <View className="my-4" />
        <Text className="font-mmedium text-black mb-2">¿En qué cuenta deseas recibir tu dinero?</Text>
        <TouchableOpacity
          onPress={() => accountDrawerRef.current?.present()}
          className={`font-mmedium border rounded-lg py-4 px-5 bg-white flex flex-row justify-between ${
            formik.touched.account && formik.errors.account ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <Text className={formik.values.account ? 'font-msemibold' : 'font-mlight'}>
            {formik.values.account?.account_name || 'Selecciona'}
          </Text>
          <Octicons name="chevron-down" size={20} />
        </TouchableOpacity>
        {formik.touched.account && formik.errors.account && (
          <Text className="text-red-500 text-xs mt-1 font-mmedium">{formik.errors.account}</Text>
        )}

        <View className="my-2" />
        <InfoCard
          color="orange"
          content={'Recuerda que las cuentas deben estar **a tu nombre**. Kambista no transfiere a **cuentas de terceros**.'}
        />

        {/* Origen de fondos */}
        <View className="my-4" />
        <Text className="font-mmedium text-black mb-2">Origen de fondos</Text>
        <TouchableOpacity
          onPress={() => sourceDrawerRef.current?.present()}
          className={`font-mmedium border rounded-lg py-4 px-5 bg-white flex flex-row justify-between ${
            formik.touched.sourceFund && formik.errors.sourceFund ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <Text className={formik.values.sourceFund ? 'font-msemibold' : 'font-mlight'}>
            {formik.values.sourceFund?.name || 'Selecciona'}
          </Text>
          <Octicons name="chevron-down" size={20} />
        </TouchableOpacity>
        {formik.touched.sourceFund && formik.errors.sourceFund && (
          <Text className="text-red-500 text-xs mt-1 font-mmedium">{formik.errors.sourceFund}</Text>
        )}

        {/* Botón Continuar */}
        <View className="my-4" />
        <TouchableOpacity 
          onPress={() => formik.handleSubmit()}
          className={`w-full py-5 rounded-xl ${
            formik.isValid ? 'bg-primary' : 'bg-gray-300'
          }`}
          disabled={!formik.isValid}
        >
          <Text className="text-center text-lg font-msemibold">CONTINUAR</Text>
        </TouchableOpacity>

        <View className="my-16" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Complete;