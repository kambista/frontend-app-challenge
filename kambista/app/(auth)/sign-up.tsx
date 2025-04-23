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

// Función para calcular edad
const calculateAge = (birthDate: Date) => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

// Esquema de validación mejorado
const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email('Correo inválido')
    .required('Campo requerido')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Formato de email incorrecto'),
  
  password: Yup.string()
    .min(6, 'Mínimo 6 caracteres')
    .required('Campo requerido'),
  
  fullname: Yup.string()
    .required('Campo requerido')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'No se permiten números ni caracteres especiales'),
  
  document_id: Yup.number()
    .required('Seleccione un tipo de documento')
    .min(1, 'Seleccione un tipo de documento'),
  
  document_number: Yup.string()
    .required('Campo requerido')
    .when('document_id', {
      is: 1, // DNI
      then: (schema) => schema
        .matches(/^[0-9]{8}$/, 'DNI debe tener 8 dígitos')
        .length(8, 'DNI debe tener exactamente 8 dígitos'),
    })
    .when('document_id', {
      is: 2, // CE
      then: (schema) => schema
        .matches(/^[0-9]{9}$/, 'CE debe tener 9 dígitos')
        .length(9, 'CE debe tener exactamente 9 dígitos'),
    })
    .when('document_id', {
      is: 3, // Pasaporte
      then: (schema) => schema
        .matches(/^[a-zA-Z0-9]{8,15}$/, 'Pasaporte debe tener entre 8 y 15 caracteres alfanuméricos')
        .min(8, 'Mínimo 8 caracteres')
        .max(15, 'Máximo 15 caracteres'),
    }),
  
  phone_number: Yup.string()
    .required('Campo requerido')
    .matches(/^[0-9]{9}$/, 'Debe tener exactamente 9 dígitos')
    .length(9, 'Debe tener exactamente 9 dígitos'),
  
  birthdate: Yup.date()
    .required('Campo requerido')
    .max(new Date(), 'La fecha no puede ser futura')
    .test('is-adult', 'Debes ser mayor de edad', (value) => {
      return calculateAge(value) >= 18;
    }),
  
  previousExchange: Yup.number().nullable(),
  
  termsAccepted: Yup.boolean()
    .oneOf([true], 'Debes aceptar los términos y condiciones')
    .required('Debes aceptar los términos y condiciones'),
  
  privacyPolicyAccepted: Yup.boolean()
    .oneOf([true], 'Debes aceptar la política de privacidad')
    .required('Debes aceptar la política de privacidad'),
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
        birthdate: values.birthdate.toISOString().split('T')[0], // Formato YYYY-MM-DD
      };
      Logger.log('REGISTRANDO');
      const success = register(payload);
      if (success == true) {
        navigateToSignUpFinish();
      } else {
        Logger.log('Error registrando');
      }
    } catch (error) {
      Logger.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      fullname: '',
      document_id: -1,
      document_number: '',
      phone_number: '',
      birthdate: new Date(new Date().setFullYear(new Date().getFullYear() - 18)), // Default a 18 años atrás
      previousExchange: -1,
      termsAccepted: false,
      privacyPolicyAccepted: false,
    },
    validationSchema: SignUpSchema,
    onSubmit: handleSubmit,
    validateOnBlur: true,
    validateOnChange: true,
  });

  // Función para manejar cambios en el número de documento con validación en tiempo real
  const handleDocumentNumberChange = (text: string) => {
    // Validación básica según tipo de documento
    if (formik.values.document_id === 1) { // DNI
      const cleanedValue = text.replace(/[^0-9]/g, '').slice(0, 8);
      formik.setFieldValue('document_number', cleanedValue);
    } else if (formik.values.document_id === 2) { // CE
      const cleanedValue = text.replace(/[^0-9]/g, '').slice(0, 9);
      formik.setFieldValue('document_number', cleanedValue);
    } else if (formik.values.document_id === 3) { // Pasaporte
      const cleanedValue = text.replace(/[^a-zA-Z0-9]/g, '').slice(0, 15);
      formik.setFieldValue('document_number', cleanedValue);
    } else {
      formik.setFieldValue('document_number', text);
    }
    formik.setFieldTouched('document_number', true, false);
  };

  // Función para manejar cambios en el nombre (solo letras y espacios)
  const handleNameChange = (text: string) => {
    const cleanedValue = text.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    formik.setFieldValue('fullname', cleanedValue);
    formik.setFieldTouched('fullname', true, false);
  };

  // Función para manejar cambios en el teléfono (solo números y máximo 9)
  const handlePhoneChange = (text: string) => {
    const cleanedValue = text.replace(/[^0-9]/g, '').slice(0, 9);
    formik.setFieldValue('phone_number', cleanedValue);
    formik.setFieldTouched('phone_number', true, false);
  };

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
                {formik.touched.email && formik.errors.email && (
                  <Text className="text-red-500 text-xs mt-1 font-mmedium">{formik.errors.email}</Text>
                )}
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
                    className="flex-1 font-mmedium h-12"
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
                  onChangeText={handleNameChange}
                  onBlur={formik.handleBlur('fullname')}
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
                      formik.touched.document_id && formik.errors.document_id ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <Picker 
                      selectedValue={formik.values.document_id} 
                      onValueChange={(value) => {
                        formik.setFieldValue('document_id', value);
                        formik.setFieldValue('document_number', ''); // Resetear número al cambiar tipo
                      }}
                    >
                      <Picker.Item key={-1} label={'Seleccione'} value={-1} color="#828282" />
                      {Documents.map((cur) => (
                        <Picker.Item key={cur.id} label={cur.name} value={cur.id} />
                      ))}
                    </Picker>
                  </View>
                  <TextInput
                    placeholder={
                      formik.values.document_id === 1 ? '8 dígitos' : 
                      formik.values.document_id === 2 ? '9 dígitos' : 
                      formik.values.document_id === 3 ? '8-15 caracteres' : 
                      'N de documento'
                    }
                    value={formik.values.document_number}
                    keyboardType={
                      formik.values.document_id === 3 ? 'default' : 'numeric'
                    }
                    className={`flex-1 font-mmedium border rounded-lg py-4 pl-5 ${
                      formik.touched.document_number && formik.errors.document_number ? 'border-red-500' : 'border-gray-300'
                    }`}
                    onChangeText={handleDocumentNumberChange}
                    onBlur={formik.handleBlur('document_number')}
                  />
                </View>
                {formik.touched.document_id && formik.errors.document_id && (
                  <Text className="text-red-500 text-xs mt-1 font-mmedium">{formik.errors.document_id}</Text>
                )}
                {formik.touched.document_number && formik.errors.document_number && (
                  <Text className="text-red-500 text-xs mt-1 font-mmedium">{formik.errors.document_number}</Text>
                )}
              </View>

              {/* Celular y Fecha de Nacimiento */}
              <View className="mb-6 flex flex-row gap-4">
                {/* Celular */}
                <View className="flex-1">
                  <Text className="font-mmedium text-gray-700 mb-2">Celular</Text>
                  <TextInput
                    placeholder="9 dígitos"
                    value={formik.values.phone_number}
                    keyboardType="phone-pad"
                    className={`font-mmedium border rounded-lg py-4 pl-5 ${
                      formik.touched.phone_number && formik.errors.phone_number ? 'border-red-500' : 'border-gray-300'
                    }`}
                    onChangeText={handlePhoneChange}
                    onBlur={formik.handleBlur('phone_number')}
                  />
                  {formik.touched.phone_number && formik.errors.phone_number && (
                    <Text className="text-red-500 text-xs mt-1 font-mmedium">{formik.errors.phone_number}</Text>
                  )}
                </View>

                {/* Fecha de nacimiento */}
                <View className="flex-1">
                  <Text className="font-mmedium text-gray-700 mb-2">Fecha de nacimiento</Text>
                  <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    className={`border rounded-lg py-4 pl-5 ${
                      formik.touched.birthdate && formik.errors.birthdate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <Text className="font-mmedium">{formik.values.birthdate.toLocaleDateString('es-ES')}</Text>
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      value={formik.values.birthdate}
                      mode="date"
                      display="default"
                      maximumDate={new Date()}
                      onChange={(event, date) => {
                        setShowDatePicker(false);
                        if (date) {
                          formik.setFieldValue('birthdate', date);
                        }
                      }}
                    />
                  )}
                  {formik.touched.birthdate && formik.errors.birthdate && (
                    <Text className="text-red-500 text-xs mt-1 font-mmedium">{formik.errors.birthdate}</Text>
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
            <TouchableOpacity 
              onPress={() => formik.handleSubmit()} 
              className={`w-full py-5 rounded-xl ${formik.isValid ? 'bg-primary' : 'bg-gray-300'}`}
              disabled={!formik.isValid}
            >
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