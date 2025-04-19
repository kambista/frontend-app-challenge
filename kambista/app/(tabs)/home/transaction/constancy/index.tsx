import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { TransactionStepper } from '@/constants/Steppers';
import Stepper from '@/components/Stepper';
import Header from '@/components/Header';
import Images from '@/constants/Images';
import { Octicons, MaterialIcons } from '@expo/vector-icons';
import CardContainer from '@/components/CardContainer';

const History = () => {
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    uri: string;
  } | null>(null);

  const navigateToFinishTransaction = () => {
    if (!selectedFile) {
      Alert.alert('Error', 'Debes seleccionar una imagen primero');
      return;
    }
    router.push('/(tabs)/home/transaction/finish-transaction');
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedFile({
          name: result.assets[0].uri.split('/').pop() || 'image.jpg',
          uri: result.assets[0].uri,
        });
      }
    } catch (error) {
      console.error('Error selecting image:', error);
      Alert.alert('Error', 'No se pudo seleccionar la imagen');
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <SafeAreaView className="min-h-screen">
      <ScrollView className="px-6 py-2">
        <Header title="Envía tu constancia" />
        <View className="my-2" />

        <View className="w-[85%] self-center">
          <Stepper steps={TransactionStepper} activeStep={2} />
        </View>

        <View className="my-4" />

        <CardContainer className="mt-4">
          <View className="justify-center items-center">
            <Image source={Images.Logo} className="w-48" resizeMode="contain" />
          </View>

          <Text className="font-mregular text-lg text-gray-800">Adjunta el comprobante de tu transferencia para poder verificar tu operación.</Text>

          <CardContainer className="mt-4">
            <Text className="font-mmedium text-md text-black">Sube la imagen de tu comprobante</Text>

            {selectedFile ? (
              <View className="mt-4">
                <View className="border border-gray-300 rounded-lg p-3 bg-gray-50">
                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center flex-1">
                      <MaterialIcons name="image" size={24} color="#4B5563" />
                      <Text className="font-mmedium ml-2 flex-1" numberOfLines={1}>
                        {selectedFile.name}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={removeFile}>
                      <MaterialIcons name="close" size={20} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>
                <Image source={{ uri: selectedFile.uri }} className="w-full h-40 mt-2 rounded-lg" resizeMode="contain" />
              </View>
            ) : (
              <TouchableOpacity
                onPress={selectImage}
                className="font-mmedium border border-gray-300 rounded-lg py-4 my-2 px-5 bg-white flex flex-row justify-between items-center"
              >
                <Text className="font-mlight text-mmedium">Seleccionar imagen</Text>
                <Octicons name="upload" size={20} color="#4B5563" />
              </TouchableOpacity>
            )}

            <Text className="font-mmedium text-md text-black mt-2">*Formatos permitidos: JPG, PNG</Text>
          </CardContainer>

          <View className="mt-6">
            <Text className="font-mregular text-gray-800 mb-2">Recuerda:</Text>
            <View className="flex-row items-start mb-2">
              <View className="bg-black aspect-square h-1 rounded-full m-2" />
              <Text className="font-mregular text-gray-800 flex-1">
                El comprobante debe mostrar claramente el monto, datos del beneficiario, fecha y hora.
              </Text>
            </View>
            <View className="flex-row items-start mb-2">
              <View className="bg-black aspect-square h-1 rounded-full m-2" />
              <Text className="font-mregular text-gray-800 flex-1">La imagen debe ser clara y legible.</Text>
            </View>
            <View className="flex-row items-start">
              <View className="bg-black aspect-square h-1 rounded-full m-2" />
              <Text className="font-mregular text-gray-800 flex-1">Asegúrate de que toda la información importante sea visible.</Text>
            </View>
          </View>

          <View className="my-4" />
        </CardContainer>

        <View className="my-4" />

        <TouchableOpacity
          onPress={navigateToFinishTransaction}
          className={`w-full py-5 rounded-xl ${selectedFile ? 'bg-primary' : 'bg-gray-300'}`}
          disabled={!selectedFile}
        >
          <Text className="text-center text-lg font-msemibold">ENVIAR COMPROBANTE</Text>
        </TouchableOpacity>

        <View className="my-16" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default History;
