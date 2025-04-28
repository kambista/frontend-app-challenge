import { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { CustomButton } from './CustomButton';
import { EvidenceIcon } from '../icons/EvidenceIcon';
import { TransactionStepper } from './TransactionStepper';
import { PictureIcon } from './PictureIcon';
import { ChevronLeftIcon } from '../icons/ChevronLeftIcon';
import { OutIcon } from '../icons/OutIcon';
import { Link, router } from 'expo-router';
import { useTransactionStepperStore } from '../../stores/transactionStepperStore';

interface Props {
  onContinue: () => void;
}

export const TransactionSendEvidenceForm: React.FC<Props> = ({
  onContinue,
}) => {
  const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(
    null,
  );
  const { setStep } = useTransactionStepperStore();

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*', 'application/msword'],
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        Alert.alert('Error', 'No se seleccionó ningún archivo.');
        return;
      }

      const selectedFile = result.assets?.[0];
      if (!selectedFile) {
        Alert.alert('Error', 'No se pudo obtener el archivo seleccionado.');
        return;
      }

      const fileSizeInMB = selectedFile.size
        ? selectedFile.size / (1024 * 1024)
        : 0;
      if (fileSizeInMB > 10) {
        Alert.alert('Error', 'El archivo no debe exceder los 10 MB.');
        return;
      }

      setFile(selectedFile);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al seleccionar el archivo.');
    }
  };

  const handleSubmit = () => {
    if (!file) {
      Alert.alert('Error', 'Por favor, sube un archivo primero.');
      return;
    }
    onContinue();
  };

  return (
    <View className="px-4">
      <View className="flex-row items-center justify-between px-4 py-4">
        <TouchableOpacity
          className="p-2"
          onPress={() => {
            setStep(1);
          }}
        >
          <ChevronLeftIcon />
        </TouchableOpacity>
        <Text
          className="text-secondary font-montserrat-bold"
          style={{ fontSize: 14 }}
        >
          Envía tu constancia
        </Text>
        <Link asChild href="/" className="p-2" style={{ opacity: 0 }}>
          <OutIcon />
        </Link>
      </View>
      <TransactionStepper currentStep={2} />
      <View
        className="bg-white p-4 mt-2 mb-6 shadow-md"
        style={{ borderRadius: 8 }}
      >
        <View className="items-center my-8">
          <EvidenceIcon />
        </View>

        <View className="mb-6">
          <Text className="text-center font-montserrat-light text-[#060F26]">
            Adjunta la constancia de tu transferencia para poder verificar tu
            operación.
          </Text>
        </View>

        <View
          className="mb-6 pb-6 border border-gray-20"
          style={{ borderRadius: 12 }}
        >
          <Text
            className="text-secondary mb-2 mt-2 pt-2 pb-2 font-montserrat text-center"
            style={{ fontSize: 14 }}
          >
            Sube el archivo de tu constancia
          </Text>

          <TouchableOpacity
            onPress={handleFileUpload}
            className="border border-gray-300 rounded-xl px-4 mx-4 py-3 flex-row items-center justify-between"
            style={{
              borderWidth: 1,
              borderRadius: 12,
              borderColor: '#E0E0E0',
              paddingHorizontal: 16,
              paddingVertical: 12,
            }}
          >
            <Text
              className="text-[#666666]"
              style={{
                fontSize: 14,
              }}
            >
              {file ? file.name : 'Selecciona archivo'}
            </Text>
            <PictureIcon />
          </TouchableOpacity>

          <Text
            className="text-gray-60 mt-2 text-center mb-2 font-montserrat"
            style={{ fontSize: 12 }}
          >
            *Tamaño máximo permitido del archivo 10 Mb
          </Text>
        </View>

        <View className="mb-6">
          <Text
            className="text-[#666666] mb-2 font-montserrat-bold"
            style={{ fontSize: 14 }}
          >
            Recuerda:
          </Text>

          <View className="space-y-2">
            <Text
              className="text-[#666666] font-montserrat-medium"
              style={{ fontSize: 14 }}
            >
              • El voucher enviado debe tener el{' '}
              <Text className="font-montserrat-bold">
                monto, datos, del beneficiario, fecha y hora.
              </Text>
            </Text>

            <Text
              className="text-[#666666] font-montserrat-medium"
              style={{ fontSize: 14 }}
            >
              • El voucher debe ser legible.
            </Text>

            <Text
              className="text-[#666666] font-montserrat-medium"
              style={{ fontSize: 14 }}
            >
              • Archivos permitidos{' '}
              <Text className="font-montserrat-bold">
                imágenes, word y PDF.
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <CustomButton label="ENVIAR CONSTANCIA" onPressFunction={handleSubmit} />
    </View>
  );
};
