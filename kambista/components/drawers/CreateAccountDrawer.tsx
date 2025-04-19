import { Text, TouchableOpacity, View } from 'react-native';
import React, { forwardRef, useCallback, useMemo, useRef } from 'react';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { Accounts, BankAccounts, Currencies } from '@/constants/Backend';
import { Octicons } from '@expo/vector-icons';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Checkbox from '../CheckBox';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-gesture-handler';
import { Logger } from '@/utils/logger';
import InfoCard from '../InfoCard';

export type Ref = BottomSheetModal;

type CreateAccountDrawerProps = {
  onAccountSelected: (sourceFund: any) => void;
};

const AccountSchema = Yup.object().shape({
  accountType: Yup.number().required('Seleccione un tipo de cuenta bancaria'),
  entity: Yup.number().required('Seleccione una entidad bancaria'),
  currencyType: Yup.string().required('Seleccione el tipo de moneda'),
  account_number: Yup.string()
    .required('Campo requerido')
    .matches(/^[0-9]+$/, 'Solo números permitidos'),
  account_name: Yup.string().required('Campo requerido'),
  account_mine: Yup.boolean().oneOf([true], 'La cuenta debe ser tuya').required('Debes aceptar este campo'),
});

const CreateAccountDrawer = forwardRef<Ref, CreateAccountDrawerProps>((props, ref) => {
  const snapPoints = useMemo(() => ['75%'], []);

  const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />, []);

  const { dismiss } = useBottomSheetModal();

  const handleSubmit = (values: any) => {
    Logger.log('Endpoint: crear nueva cuenta.', values);
    dismiss();
  };

  const formik = useFormik({
    initialValues: {
      accountType: '',
      entity: '',
      currencyType: 'Dólar',
      account_number: '',
      account_name: '',
      account_mine: false,
    },
    validationSchema: AccountSchema,
    onSubmit: handleSubmit,
  });

  return (
    <BottomSheetModal ref={ref} index={0} snapPoints={snapPoints} backdropComponent={renderBackdrop} enableDynamicSizing={false}>
      <BottomSheetScrollView
        contentContainerStyle={{
          paddingTop: 16,
          paddingHorizontal: 20,
          alignItems: 'flex-start',
        }}
      >
        <Text className="text-2xl font-mbold">Agregar cuenta soles</Text>

        <View className="flex-1 h-px bg-gray-300 my-2" />

        <Text className="text-lg font-mmedium">La cuenta que registres debe estar a tu nombre (titular de este perfil en Kambista)</Text>

        <View className="my-2" />

        {/* Tipo de cuenta bancaria */}
        <View className="mb-4 w-full">
          <Text className="font-mmedium text-gray-700 mb-2">Tipo de cuenta bancaria</Text>
          <View className="border border-gray-300 rounded-lg">
            <Picker selectedValue={formik.values.accountType} onValueChange={(value) => formik.setFieldValue('accountType', value)}>
              <Picker.Item key={-1} label={'Seleccione último lugar de cambio'} value={-1} color="#828282" />
              {BankAccounts.map((cur) => (
                <Picker.Item key={cur.id} label={cur.name} value={cur.id} />
              ))}
            </Picker>
          </View>
          {formik.touched.accountType && formik.errors.accountType && (
            <Text className="text-red-500 text-xs mt-1 font-mmedium">{formik.errors.accountType}</Text>
          )}
        </View>

        {/* Entidad financiera */}
        <View className="mb-4 w-full">
          <Text className="font-mmedium text-gray-700 mb-2">Entidad Financiera</Text>
          <View className="border border-gray-300 rounded-lg">
            <Picker selectedValue={formik.values.entity} onValueChange={(value) => formik.setFieldValue('entity', value)}>
              <Picker.Item key={-1} label={'Seleccione último lugar de cambio'} value={-1} color="#828282" />
              {BankAccounts.map((cur) => (
                <Picker.Item key={cur.id} label={cur.name} value={cur.id} />
              ))}
            </Picker>
          </View>
          {formik.touched.entity && formik.errors.entity && <Text className="text-red-500 text-xs mt-1 font-mmedium">{formik.errors.entity}</Text>}
        </View>

        <InfoCard content={'Operamos en Lima con todos los bancos. Y en provincia con el BCP y cuentas digitales Interbank.'} />

        {/* Tipo de moneda */}
        <View className="mb-4 w-full">
          <Text className="font-mmedium text-gray-700 mb-2">Moneda</Text>
          <View className="flex flex-row gap-4 w-full">
            {Currencies.map((cur) => {
              return (
                <TouchableOpacity
                  key={cur.id}
                  className={`flex-1 items-center justify-center h-16 rounded-xl border border-black ${
                    formik.values.currencyType === cur.name ? 'bg-black' : 'bg-white'
                  }`}
                  onPress={() => {
                    formik.setFieldValue('currencyType', cur.name);
                  }}
                >
                  <Text className={`font-mmedium ${formik.values.currencyType === cur.name ? 'text-white' : 'text-black'}`}>
                    {cur.name.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {formik.touched.currencyType && formik.errors.currencyType && (
            <Text className="text-red-500 text-xs mt-1 font-mmedium">{formik.errors.currencyType}</Text>
          )}
        </View>

        {/* Campo: Account number */}
        <View className="mb-4 w-full">
          <Text className="font-mmedium text-gray-700 mb-2">Número de cuenta</Text>
          <TextInput
            placeholder="Escribe tu cuenta de destino"
            keyboardType="number-pad"
            autoCapitalize="none"
            value={formik.values.account_number}
            className={`font-mmedium border rounded-lg py-4 pl-5 ${
              formik.touched.account_number && formik.errors.account_number ? 'border-red-500' : 'border-gray-300'
            }`}
            onChangeText={formik.handleChange('account_number')}
            onBlur={formik.handleBlur('account_number')}
          />
          {formik.touched.account_number && formik.errors.account_number && (
            <Text className="text-red-500 text-xs mt-1 font-mmedium">{formik.errors.account_number}</Text>
          )}
        </View>

        {/* Campo: account_name */}
        <View className="mb-4 w-full">
          <Text className="font-mmedium text-gray-700 mb-2">Ponle nombre a tu cuenta</Text>
          <TextInput
            placeholder="Escribe un alias"
            value={formik.values.account_name}
            className={`font-mmedium border rounded-lg py-4 pl-5 ${
              formik.touched.account_name && formik.errors.account_name ? 'border-red-500' : 'border-gray-300'
            }`}
            onChangeText={formik.handleChange('account_name')}
            onBlur={formik.handleBlur('account_name')}
          />
          {formik.touched.account_name && formik.errors.account_name && (
            <Text className="text-red-500 text-xs mt-1 font-mmedium">{formik.errors.account_name}</Text>
          )}
        </View>

        <View className="my-2" />

        <Checkbox
          label="Declaro que esta cuenta es mía"
          onValueChange={(value) => formik.setFieldValue('account_mine', value)}
          value={formik.values.account_mine}
        />

        {formik.touched.account_mine && formik.errors.account_mine && (
          <Text className="text-red-500 text-xs mt-1 font-mmedium">{formik.errors.account_mine}</Text>
        )}

        <View className="my-2" />

        <TouchableOpacity onPress={formik.submitForm} className="w-full py-5 rounded-xl bg-primary">
          <Text className="text-center text-lg font-msemibold">AGREGAR CUENTA</Text>
        </TouchableOpacity>
        <View className="my-6" />
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

export default CreateAccountDrawer;
