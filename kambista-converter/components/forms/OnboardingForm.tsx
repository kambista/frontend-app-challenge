import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../api/client';
import type {
  RegisterPayload,
  RegisterResponse,
  APIError,
} from '../../api/types';
import { useCustomInputOnboarding } from '../../hooks/useCustomInputOnboarding';
import { useCustomPicker } from '../../hooks/useCustomPicker';
import { ChevronLeftIcon } from '../icons/ChevronLeftIcon';
import { OutIcon } from '../icons/OutIcon';
import { InfoIcon } from '../icons/InfoIcon';
import { CustomInputOnboarding } from '../ui/CustomInputOnboarding';
import { CustomPicker } from '../ui/CustomPicker';
import { CustomButton } from '../ui/CustomButton';
import { Failure } from '../states/Failure';

import {
  validarNombre,
  validarDocumento,
  validarTelefono,
  validarFechaNacimiento,
  formatFecha,
} from '../../utils/validators';
import { Success } from '../states/Success';

type DocumentType = 'dni' | 'cce' | 'passport';

const documentTypes: { label: string; value: DocumentType }[] = [
  { label: 'DNI', value: 'dni' },
  { label: 'CCE', value: 'cce' },
  { label: 'Pasaporte', value: 'passport' },
];

const previousExchangeLocations = [
  { label: 'Casa de cambio', value: 'casa_cambio' },
  { label: 'Banco', value: 'banco' },
  { label: 'Agente', value: 'agente' },
];

export const OnboardingForm: React.FC = () => {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDuplicateModalVisible, setIsDuplicateModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>(
    'El número de documento registrado ya está en uso.',
  );

  const documentTypePicker = useCustomPicker<DocumentType>('');
  const locationPicker = useCustomPicker<string>('');

  const nameInput = useCustomInputOnboarding({
    validator: validarNombre,
    errorMessage: 'Ingresa nombres válidos (solo letras y espacios)',
  });
  const documentInput = useCustomInputOnboarding({
    validator: (value) => {
      const type = documentTypePicker.selectedValue;
      return type ? validarDocumento(value, type) : false;
    },
    errorMessage: 'Número de documento inválido según el tipo seleccionado',
  });
  const phoneInput = useCustomInputOnboarding({
    validator: validarTelefono,
    errorMessage:
      'Número de celular inválido. Debe comenzar en 9 y tener 9 dígitos.',
  });
  const birthDateInput = useCustomInputOnboarding({
    validator: validarFechaNacimiento,
    errorMessage: 'Fecha inválida. Debes ser mayor de 18 años (DD/MM/AAAA)',
  });

  const [serverDocumentError, setServerDocumentError] = useState<string | null>(
    null,
  );

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  useEffect(() => {
    (async () => {
      const json = await AsyncStorage.getItem('onboardingData');
      if (json) {
        const stored: RegisterPayload = JSON.parse(json);
        nameInput.handleChange(stored.name);
        documentTypePicker.selectValue(stored.documentType);
        documentInput.handleChange(stored.documentNumber);
        phoneInput.handleChange(stored.phone);
        birthDateInput.handleChange(stored.birthDate);
        if (stored.lastExchange) {
          locationPicker.selectValue(stored.lastExchange);
        }
      }
    })();
  }, []);

  const handleRegister = async () => {
    setServerDocumentError(null);
    nameInput.handleBlur();
    documentInput.handleBlur();
    phoneInput.handleBlur();
    birthDateInput.handleBlur();
    documentTypePicker.markTouched();
    locationPicker.markTouched();

    if (
      !nameInput.isValid ||
      !documentTypePicker.selectedValue ||
      !documentInput.isValid ||
      !phoneInput.isValid ||
      !birthDateInput.isValid ||
      !termsAccepted ||
      !privacyAccepted
    ) {
      return;
    }

    const payload: RegisterPayload = {
      name: nameInput.value,
      documentType: documentTypePicker.selectedValue,
      documentNumber: documentInput.value,
      phone: phoneInput.value,
      birthDate: birthDateInput.value,
      lastExchange: locationPicker.selectedValue || undefined,
    };

    try {
      const res = await api.post<RegisterResponse | APIError>(
        '/onboarding/register',
        payload,
      );

      const body = res.data;

      if (!body.success) {
        if (body.data.name === 'DUPLICATE_DNI') {
          setErrorMessage(
            body.data.message ||
              'El número de documento registrado ya está en uso.',
          );
          setIsDuplicateModalVisible(true);
        } else {
          Alert.alert(body.data.title, body.data.message);
        }
        return;
      }

      await AsyncStorage.setItem('token', body.data.token);
      await AsyncStorage.setItem('onboardingData', JSON.stringify(payload));

      setIsSuccess(true);
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  if (isSuccess) {
    return <Success username={nameInput.value} />;
  }

  return (
    <ScrollView className="flex-1">
      <View className="flex-row items-center justify-between px-4 py-4">
        <TouchableOpacity className="p-2" onPress={() => router.back()}>
          <ChevronLeftIcon />
        </TouchableOpacity>
        <Text className="text-secondary text-[14px] font-montserrat-bold">
          Completa tus datos
        </Text>
        <Link asChild href="/" className="p-2">
          <TouchableOpacity className="p-2">
            <OutIcon />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="p-4">
        <Text className="text-secondary text-center text-[16px] px-4 pb-5 pt-0">
          <Text className="font-montserrat-medium">Completa tus datos </Text>
          <Text className="font-montserrat-semibold">
            como figuran en tu documento de identidad
          </Text>
        </Text>

        <CustomInputOnboarding
          label="Nombres completos"
          placeholder="Escribe tus nombres y apellidos"
          value={nameInput.value}
          onChangeText={nameInput.handleChange}
          onBlur={nameInput.handleBlur}
          isError={!!nameInput.error}
          errorMessage={nameInput.errorMessage}
        />

        <View style={styles.documentSection}>
          <Text className="text-gray-60 mb-2 font-montserrat-medium">
            Documento
          </Text>
          <View style={styles.documentRow}>
            <View style={styles.pickerContainer}>
              <CustomPicker
                options={documentTypes}
                selectedValue={documentTypePicker.selectedValue}
                onValueChange={(v) => documentTypePicker.selectValue(v)}
                isVisible={documentTypePicker.isVisible}
                togglePicker={documentTypePicker.togglePicker}
                widthClassName="w-full"
                error={
                  !documentTypePicker.selectedValue &&
                  documentTypePicker.wasTouched
                }
                placeholder="Tipo"
              />
            </View>
            <View style={styles.documentInputContainer}>
              <View
                style={[
                  styles.inputContainer,
                  (documentInput.error || serverDocumentError) &&
                    styles.inputError,
                ]}
              >
                <TextInput
                  style={styles.input}
                  placeholder="N° de documento"
                  placeholderTextColor="#A7A7A7"
                  value={documentInput.value}
                  onChangeText={documentInput.handleChange}
                  onBlur={documentInput.handleBlur}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
          <View style={styles.errorRow}>
            <View style={styles.pickerErrorContainer}>
              {!documentTypePicker.selectedValue &&
                documentTypePicker.wasTouched && (
                  <Text style={styles.errorText}>Selecciona un tipo</Text>
                )}
            </View>
            <View style={styles.documentErrorContainer}>
              {documentInput.error && (
                <Text style={styles.errorText}>
                  {documentInput.errorMessage}
                </Text>
              )}
            </View>
          </View>
        </View>

        <View className="flex-row items-center bg-blue-lighter py-4 px-4 mt-1 mb-4 rounded-md">
          <InfoIcon />
          <Text
            style={styles.textInfo}
            className="text-blue-dark ml-2 flex-1 font-montserrat-medium text-justify"
          >
            Tu documento de identidad debe coincidir con tus datos para evitar
            inconvenientes al momento de hacer una primera operación
          </Text>
        </View>

        <CustomInputOnboarding
          label="Celular"
          placeholder="N° de celular"
          value={phoneInput.value}
          onChangeText={phoneInput.handleChange}
          onBlur={phoneInput.handleBlur}
          keyboardType="phone-pad"
          isError={!!phoneInput.error}
          errorMessage={phoneInput.errorMessage}
        />

        <CustomInputOnboarding
          label="Fecha de nacimiento"
          placeholder="DD/MM/AAAA"
          value={birthDateInput.value}
          onChangeText={(t) => birthDateInput.handleChange(formatFecha(t))}
          onBlur={birthDateInput.handleBlur}
          keyboardType="numeric"
          isError={!!birthDateInput.error}
          errorMessage={birthDateInput.errorMessage}
        />

        <View style={styles.container}>
          <Text className="text-gray-60 mb-2 font-montserrat-medium">
            ¿Dónde cambiabas antes? (Opcional)
          </Text>
          <CustomPicker
            options={previousExchangeLocations}
            selectedValue={locationPicker.selectedValue}
            onValueChange={(v) => locationPicker.selectValue(v)}
            isVisible={locationPicker.isVisible}
            togglePicker={locationPicker.togglePicker}
            widthClassName="w-full"
            error={!locationPicker.selectedValue && locationPicker.wasTouched}
            placeholder="Último lugar de cambio"
          />
        </View>

        <View className="mb-6">
          <TouchableOpacity
            className="flex-row items-start mb-3"
            onPress={() => setTermsAccepted(!termsAccepted)}
          >
            <View
              className={`w-5 h-5 border rounded mr-2 mt-0.5 justify-center items-center ${
                termsAccepted
                  ? 'bg-teal-400 border-teal-400'
                  : 'border-gray-200'
              }`}
            >
              {termsAccepted && <Text className="text-white text-xs">✓</Text>}
            </View>
            <Text
              className="font-montserrat-medium text-gray-700 flex-1"
              style={{ fontSize: 12 }}
            >
              He leído y acepto los{' '}
              <Text
                className="text-secondary font-montserrat-bold underline"
                style={{ fontSize: 12 }}
              >
                Términos y condiciones
              </Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-start mb-3"
            onPress={() => setPrivacyAccepted(!privacyAccepted)}
          >
            <View
              className={`w-5 h-5 border rounded mr-2 mt-0.5 justify-center items-center ${
                privacyAccepted
                  ? 'bg-teal-400 border-teal-400'
                  : 'border-gray-25'
              }`}
            >
              {privacyAccepted && <Text className="text-white text-xs">✓</Text>}
            </View>
            <Text
              className="font-montserrat-medium text-gray-700 flex-1"
              style={{ fontSize: 12 }}
            >
              Acepto de manera expresa e informada la{' '}
              <Text
                className="text-secondary font-montserrat-bold underline"
                style={{ fontSize: 12 }}
              >
                Política de Tratamiento de datos personales de Kambista
              </Text>
            </Text>
          </TouchableOpacity>
        </View>

        <CustomButton label="Registrarme" onPressFunction={handleRegister} />
      </View>

      <Failure
        isVisible={isDuplicateModalVisible}
        onClose={() => setIsDuplicateModalVisible(false)}
        message={errorMessage}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#060F26',
    height: '100%',
    fontFamily: 'montserrat-medium',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    fontFamily: 'montserrat-regular',
  },
  documentSection: {
    marginBottom: 8,
  },
  documentRow: {
    flexDirection: 'row',
    gap: 8,
  },
  pickerContainer: {
    width: 100,
  },
  documentInputContainer: {
    flex: 1,
  },
  errorRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  pickerErrorContainer: {
    width: 100,
  },
  documentErrorContainer: {
    flex: 1,
  },
  textInfo: {
    fontSize: 12,
  },
});
