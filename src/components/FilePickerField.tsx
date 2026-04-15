import * as DocumentPicker from "expo-document-picker";
import type { DocumentPickerAsset } from "expo-document-picker";
import { useCallback, useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";
import { PLACEHOLDER_GRAY } from "../constants/colors";
import Icon from "./Icon";

export type PickedFile = {
  uri: string;
  name: string;
  size?: number;
  mimeType?: string;
};

const MAX_BYTES = 10 * 1024 * 1024;

/** Solo PDF, JPG/JPEG y PNG (filtro del sistema + validación). */
const PICK_TYPES: string[] = ["application/pdf", "image/jpeg", "image/png"];

function isAllowedByExtension(fileName: string): boolean {
  return /\.(jpe?g|png|pdf)$/i.test(fileName.trim());
}

function isAllowedMime(mime: string | undefined): boolean {
  if (!mime) return false;
  const m = mime.toLowerCase();
  return (
    m === "application/pdf" ||
    m === "image/jpeg" ||
    m === "image/jpg" ||
    m === "image/png"
  );
}

function isAllowedAsset(asset: DocumentPickerAsset): boolean {
  if (isAllowedMime(asset.mimeType)) return true;
  return isAllowedByExtension(asset.name);
}

type FilePickerFieldProps = {
  value: PickedFile | null;
  onChange: (file: PickedFile | null) => void;
};

export default function FilePickerField({ value, onChange }: FilePickerFieldProps) {
  const [busy, setBusy] = useState(false);

  const pick = useCallback(async () => {
    setBusy(true);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: PICK_TYPES,
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled || !result.assets?.length) return;

      const asset = result.assets[0];

      if (asset.size != null && asset.size > MAX_BYTES) {
        Alert.alert(
          "Archivo demasiado grande",
          "El tamaño máximo permitido es 10 Mb.",
        );
        return;
      }

      if (!isAllowedAsset(asset)) {
        Alert.alert(
          "Formato no permitido",
          "Solo se admiten archivos PDF, JPG o PNG.",
        );
        return;
      }

      onChange({
        uri: asset.uri,
        name: asset.name,
        size: asset.size,
        mimeType: asset.mimeType,
      });
    } catch {
      Alert.alert("Error", "No se pudo seleccionar el archivo. Intenta de nuevo.");
    } finally {
      setBusy(false);
    }
  }, [onChange]);

  const displayName = value?.name ?? null;

  return (
    <View className="w-full">
      <Text className="mb-2 text-xs font-bold text-kambista-muted">
        Sube el archivo de tu constancia
      </Text>
      <Pressable
        accessibilityRole="button"
        disabled={busy}
        onPress={pick}
        className="min-h-[52px] w-full flex-row items-center justify-between rounded-xl border border-kambista-border bg-white px-4 py-3.5 active:opacity-90"
      >
        <Text
          className="flex-1 pr-3 text-base"
          style={{ color: displayName ? "#0A1F33" : PLACEHOLDER_GRAY }}
          numberOfLines={1}
        >
          {displayName ?? "Selecciona archivo"}
        </Text>
        {busy ? (
          <ActivityIndicator color="#0A1F33" />
        ) : (
          <View className="relative">
            <Icon name="images-outline" size={24} color="#4B5563" />
            <View className="absolute -bottom-0.5 -right-0.5 rounded-full bg-white">
              <Icon name="arrow-up" size={12} color="#0A1F33" />
            </View>
          </View>
        )}
      </Pressable>
      <Text className="mt-1.5 text-xs text-kambista-muted">
        *Tamaño máximo permitido del archivo 10 Mb
      </Text>
    </View>
  );
}
