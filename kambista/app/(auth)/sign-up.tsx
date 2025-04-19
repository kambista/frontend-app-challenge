import { View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import { useFormik } from 'formik';
import { Logger } from '@/utils/logger';
import Header from '@/components/Header';
import { Picker } from '@react-native-picker/picker';
import { BankAccounts, Documents } from '@/constants/Backend';
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from '@/components/CheckBox';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import useAuth from '@/hooks/useAuth';
import InfoCard from '@/components/InfoCard';

// Esquema de validación
const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Correo inválido').required('Campo requerido'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Campo requerido'),
  name: Yup.string().required('Campo requerido'),
  documentType: Yup.number().required('Seleccione un tipo de documento'),
  documentNumber: Yup.string().required('Campo requerido').min(6, 'Mínimo 6 caracteres'),
  phone: Yup.string()
    .required('Campo requerido')
    .matches(/^[0-9]+$/, 'Solo números permitidos'),
  birthDate: Yup.date().required('Campo requerido').max(new Date(), 'La fecha no puede ser futura'),
  previousExchange: Yup.number().nullable(),
  termsAccepted: Yup.boolean().oneOf([true], 'Debes aceptar los términos y condiciones').required('Debes aceptar los términos y condiciones'),
  privacyPolicyAccepted: Yup.boolean().oneOf([true], 'Debes aceptar la política de privacidad').required('Debes aceptar la política de privacidad'),
});

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { register } = useAuth();
  const navigateToSignUpFinish = () => {
    router.push('/(auth)/sign-up-finish');
  };

  const handleSubmit = (values: any) => {
    try {
      const payload = {
        ...values,
        birthDate: values.birthDate.toISOString().split('T')[0], // Formato YYYY-MM-DD
      };
      const success = register(payload);
      if (success) {
        navigateToSignUpFinish();
      } else {
        Logger.log('Error registrando');
      }
    } catch (error) {
      Logger.log(error);
    }
    navigateToSignUpFinish();
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      fullname: '',
      documentType: -1,
      documentNumber: '',
      phone: '',
      birthDate: new Date(),
      previousExchange: -1,
      termsAccepted: false,
      privacyPolicyAccepted: false,
    },
    validationSchema: SignUpSchema,
    onSubmit: handleSubmit,
  });

  return (
    <SafeAreaView className="bg-white h-full">
      <KeyboardAvoidingView className="flex-1" behavior="padding">
        <ScrollView>
          <View className="w-full justify-center h-full px-6 my-2">
            <View className="my-2" />

            <Header title="Completa tus datos" />

            <Text className="text-lg text-center font-msemibold mt-4">Completa tus datos como figuran{'\n'}en tu documento de identidad</Text>

            <View className="my-4" />

            {/* Formulario */}
            <View className="w-full max-w-md">
              {/* Campo: Email */}
              <View className="mb-4">
                <Text className="font-mmedium text-gray-700 mb-2">Correo electrónico</Text>
                <TextInput
                  placeholder="ejemplo@correo.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formik.values.email}
                  className={`font-mmedium border border-gray-300 rounded-lg py-4 pl-5 ${
                    formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  onChangeText={formik.handleChange('email')}
                  onBlur={formik.handleBlur('email')}
                />
                {formik.touched.email && formik.errors.email && <Text className="text-red-500 text-xs mt-1 font-mmedium">{formik.errors.email}</Text>}
              </View>

              {/* Campo: Contraseña */}
              <View className="mb-6">
                <Text className="font-mmedium text-gray-700 mb-2">Contraseña</Text>
                <View
                  className={`border rounded-lg py-1 px-4 flex-row items-center ${
                    formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <TextInput
                    placeholder="••••••••"
                    secureTextEntry={!showPassword}
                    className="flex-1 font-mmedium"
                    value={formik.values.password}
                    onChangeText={formik.handleChange('password')}
                    onBlur={formik.handleBlur('password')}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} size={20} color="gray" />
                  </TouchableOpacity>
                </View>
                {formik.touched.password && formik.errors.password && (
                  <Text className="text-red-500 text-xs mt-1 font-mmedium">{formik.errors.password}</Text>
                )}
              </View>

              {/* Campo: Fullname */}
              <View className="mb-4">
                <Text className="font-mmedium text-gray-700 mb-2">Nombres completos</Text>
                <TextInput
                  placeholder="Ingresa tus nombres completos"
                  value={formik.values.fullname}
                  className={`font-mmedium border rounded-lg py-4 pl-5 ${
                    formik.touched.fullname && formik.errors.fullname ? 'border-red-500' : 'border-gray-300'
                  }`}
                  onChangeText={formik.handleChange('name')}
                  onBlur={formik.handleBlur('name')}
                />
                {formik.touched.fullname && formik.errors.fullname && (
                  <Text className="text-red-500 text-xs mt-1 font-mmedium">{formik.errors.fullname}</Text>
                )}
              </View>

              {/* Campo: DNI */}
              <View className="mb-6">
                <Text className="font-mmedium text-gray-700 mb-2">Documento</Text>
                <View className="flex flex-row gap-4">
                  <View
                    className={`w-32 border rounded-lg ${
                      formik.touched.documentType && formik.errors.documentType ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <Picker selectedValue={formik.values.documentType} onValueChange={(value) => formik.setFieldValue('documentType', value)}>
                      <Picker.Item key={-1} label={'Seleccione un valor'} value={-1} color="#828282" />
                      {Documents.map((cur) => (
                        <Picker.Item key={cur.id} label={cur.name} value={cur.id} />
                      ))}
                    </Picker>
                  </View>
                  <TextInput
                    placeholder="N de documento"
                    value={formik.values.documentNumber}
                    className={`flex-1 font-mmedium border rounded-lg py-4 pl-5 ${
                      formik.touched.documentNumber && formik.errors.documentNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    onChangeText={formik.handleChange('documentNumber')}
                    onBlur={formik.handleBlur('documentNumber')}
                  />
                </View>
                {formik.touched.documentType && formik.errors.documentType && (
                  <Text className="text-red-500 text-xs mt-1 font-mmedium">{formik.errors.documentType}</Text>
                )}
                {formik.touched.documentNumber && formik.errors.documentNumber && (
                  <Text className="text-red-500 text-xs mt-1 font-mmedium">{formik.errors.documentNumber}</Text>
                )}
              </View>

              {/* Celular y Fecha de Nacimiento */}
              <View className="mb-6 flex flex-row gap-4">
                {/* Celular */}
                <View className="flex-1">
                  <Text className="font-mmedium text-gray-700 mb-2">Celular</Text>
                  <TextInput
                    placeholder="N° de celular"
                    value={formik.values.phone}
                    keyboardType="phone-pad"
                    className={`font-mmedium border rounded-lg py-4 pl-5 ${
                      formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    onChangeText={formik.handleChange('phone')}
                    onBlur={formik.handleBlur('phone')}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <Text className="text-red-500 text-xs mt-1 font-mmedium">{formik.errors.phone}</Text>
                  )}
                </View>

                {/* Fecha de nacimiento */}
                <View className="flex-1">
                  <Text className="font-mmedium text-gray-700 mb-2">Fecha de nacimiento</Text>
                  <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    className={`border rounded-lg py-4 pl-5 ${
                      formik.touched.birthDate && formik.errors.birthDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <Text className="font-mmedium">{formik.values.birthDate.toLocaleDateString('es-ES')}</Text>
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      value={formik.values.birthDate}
                      mode="date"
                      display="default"
                      maximumDate={new Date()}
                      onChange={(event, date) => {
                        setShowDatePicker(false);
                        if (date) {
                          formik.setFieldValue('birthDate', date);
                        }
                      }}
                    />
                  )}
                  {formik.touched.birthDate && formik.errors.birthDate && (
                    <Text className="text-red-500 text-xs mt-1 font-mmedium">{formik.errors.birthDate}</Text>
                  )}
                </View>
              </View>
            </View>

            <InfoCard
              content={'Tu documento de identidad debe coincidir con tus datos para evitar inconvenientes al momento de hacer una primera operación.'}
            />

            {/* Lugar de cambio anterior */}
            <View className="mb-4">
              <Text className="font-mmedium text-gray-700 mb-2">¿Dónde cambiabas antes? (Opcional)</Text>
              <View className="border border-gray-300 rounded-lg">
                <Picker selectedValue={formik.values.previousExchange} onValueChange={(value) => formik.setFieldValue('previousExchange', value)}>
                  <Picker.Item key={-1} label={'Seleccione último lugar de cambio'} value={-1} color="#828282" />
                  {BankAccounts.map((cur) => (
                    <Picker.Item key={cur.id} label={cur.name} value={cur.id} />
                  ))}
                </Picker>
              </View>
              {formik.touched.previousExchange && formik.errors.previousExchange && (
                <Text className="text-red-500 text-xs mt-1 font-mmedium">{formik.errors.previousExchange}</Text>
              )}
            </View>

            {/* Términos y condiciones */}
            <Checkbox
              label="He leído y acepto los Términos y condiciones"
              onValueChange={(value) => formik.setFieldValue('termsAccepted', value)}
              value={formik.values.termsAccepted}
            />
            <View className="my-1" />
            <Checkbox
              label="Acepto de manera expresa e informada la Política de Tratamiento de datos personales de Kambista"
              onValueChange={(value) => formik.setFieldValue('privacyPolicyAccepted', value)}
              value={formik.values.privacyPolicyAccepted}
            />

            {formik.touched.termsAccepted && formik.errors.termsAccepted && (
              <Text className="text-red-500 text-xs mt-1 font-mmedium">{formik.errors.termsAccepted}</Text>
            )}
            {formik.touched.privacyPolicyAccepted && formik.errors.privacyPolicyAccepted && (
              <Text className="text-red-500 text-xs mt-1 font-mmedium">{formik.errors.privacyPolicyAccepted}</Text>
            )}

            <View className="my-4" />
            <TouchableOpacity onPress={() => formik.handleSubmit()} className="w-full py-5 rounded-xl bg-primary">
              <Text className="text-center text-lg font-msemibold">REGISTRARME</Text>
            </TouchableOpacity>
            <View className="my-6" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
