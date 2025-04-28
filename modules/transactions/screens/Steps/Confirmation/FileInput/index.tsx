import ImageUploadIcon from "@/components/Icons/ImageUploadIcon";
import { cn } from "@/utils/cn";
import { log } from "@/utils/logger";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";

interface FileInputProps {
  onFileSelected?: (file: ImagePicker.ImagePickerAsset) => void;
  onFileRemoved?: () => void;
  maxSize?: number; //MB
  allowedTypes?: string[];
  label?: string;
  className?: string;
  error?: string;
  loading?: boolean;
  initialFile?: ImagePicker.ImagePickerAsset | null;
  disabled?: boolean;
}

const FileInput = ({
  onFileSelected,
  onFileRemoved,
  maxSize = 10,
  allowedTypes = ["image/*", "application/pdf"],
  label = "Selecciona archivo",
  className,
  error,
  loading = false,
  initialFile = null,
  disabled = false
}: FileInputProps) => {
  const [selectedFile, setSelectedFile] =
    useState<ImagePicker.ImagePickerAsset | null>(initialFile);
  const [permissions, requestPermission] = ImagePicker.useCameraPermissions();

  const handlePickImage = async () => {
    if (disabled || loading) return;

    Alert.alert("Seleccionar archivo", "¿Cómo quieres subir el archivo?", [
      {
        text: "Cancelar",
        style: "cancel"
      },
      {
        text: "Tomar foto",
        onPress: async () => {
          if (!permissions?.granted) {
            const { granted } = await requestPermission();
            if (!granted) {
              Alert.alert(
                "Permiso requerido",
                "Necesitamos acceso a tu cámara para tomar fotos."
              );
              return;
            }
          }
          pickFromCamera();
        }
      },
      {
        text: "Elegir de la galería",
        onPress: pickFromGallery
      }
    ]);
  };

  const pickFromCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];

        const fileSize = selectedAsset.fileSize
          ? selectedAsset.fileSize / (1024 * 1024)
          : 0;

        if (fileSize > maxSize) {
          Alert.alert(
            "Archivo demasiado grande",
            `El tamaño máximo permitido es de ${maxSize}MB. Tu archivo es de ${fileSize.toFixed(
              2
            )}MB.`
          );
          return;
        }

        setSelectedFile(selectedAsset);
        if (onFileSelected) {
          onFileSelected(selectedAsset);
        }
      }
    } catch (error) {
      log.error("Error al seleccionar imagen:", error);
      Alert.alert("Error", "No se pudo seleccionar la imagen");
    }
  };

  const pickFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        quality: 0.8
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];

        const fileSize = selectedAsset.fileSize
          ? selectedAsset.fileSize / (1024 * 1024)
          : 0;

        if (fileSize > maxSize) {
          Alert.alert(
            "Archivo demasiado grande",
            `El tamaño máximo permitido es de ${maxSize}MB. Tu archivo es de ${fileSize.toFixed(
              2
            )}MB.`
          );
          return;
        }

        setSelectedFile(selectedAsset);
        if (onFileSelected) {
          onFileSelected(selectedAsset);
        }
      }
    } catch (error) {
      log.error("Error al seleccionar imagen:", error);
      Alert.alert("Error", "No se pudo seleccionar el archivo");
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (onFileRemoved) {
      onFileRemoved();
    }
  };

  const isImage = selectedFile?.type?.startsWith("image");

  const getFileName = () => {
    if (selectedFile?.fileName) return selectedFile.fileName;
    if (selectedFile?.uri) {
      const uriParts = selectedFile.uri.split("/");
      return uriParts[uriParts.length - 1];
    }
    return "Archivo seleccionado";
  };

  return (
    <View className={cn("w-full", className)}>
      {!selectedFile ? (
        <TouchableOpacity
          onPress={handlePickImage}
          disabled={disabled || loading}
          className={cn(
            "flex-row justify-between items-center border rounded-xl px-4 py-3",
            disabled ? "opacity-50 border-gray-300" : "border-[#E5E5E5]",
            error ? "border-red-500" : ""
          )}
        >
          <Text
            className={cn("text-[#666666]", disabled ? "text-gray-400" : "")}
          >
            {label}
          </Text>
          {loading ? (
            <ActivityIndicator size="small" color="#060F26" />
          ) : (
            <ImageUploadIcon size={28} color="#060F26" />
          )}
        </TouchableOpacity>
      ) : (
        <View
          className={cn(
            "flex-row justify-between items-center border border-primary rounded-xl px-4 py-3 bg-blue-50",
            error ? "border-red-500" : ""
          )}
        >
          <View className="flex-row items-center flex-1 mr-2">
            {isImage ? (
              <Image
                source={{ uri: selectedFile.uri }}
                className="w-16 h-16 mr-3 rounded-md"
                style={{ resizeMode: "cover" }}
              />
            ) : (
              <AntDesign name="file1" size={24} color="#060F26" />
            )}
            <Text
              className="flex-1 text-gray-60"
              numberOfLines={1}
              ellipsizeMode="middle"
            >
              {getFileName()}
            </Text>
          </View>

          {loading ? (
            <ActivityIndicator size="small" color="#060F26" />
          ) : (
            <TouchableOpacity onPress={handleRemoveFile} disabled={disabled}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
      )}

      {error ? (
        <Text className="mt-2 text-xs text-red-500">{error}</Text>
      ) : (
        <Text className="mt-2 text-xs font-montserrat-medium text-gray-60">
          *Tamaño máximo permitido del archivo {maxSize} MB
        </Text>
      )}
    </View>
  );
};

export default FileInput;
