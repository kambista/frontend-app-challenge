import { useState, type ReactNode } from "react";
import { Image, Text, View } from "react-native";
import Button from "../Button";
import FilePickerField, { type PickedFile } from "../FilePickerField";
import { CARD_ELEVATION_STYLE } from "../../constants/colors";

type ConstanciaStepProps = {
  onSuccess: () => void;
};

export default function ConstanciaStep({ onSuccess }: ConstanciaStepProps) {
  const [file, setFile] = useState<PickedFile | null>(null);

  const handleSubmit = () => {
    if (!file) return;
    // TODO: subir con FormData al endpoint de constancia cuando exista el servicio.
    console.log("[ConstanciaStep] archivo listo para enviar", file.uri, file.name);
    onSuccess();
  };

  return (
    <View className="pb-6">
      <View className="mb-6 rounded-2xl bg-white p-5" style={CARD_ELEVATION_STYLE}>
        <View className="items-center justify-center">
          <View className="relative mb-4 h-[140px] w-full items-center justify-center">
            <Image
              source={require("../../../assets/logo_step_constancia.png")}
              className="h-full w-full max-h-[80px]"
              resizeMode="contain"
              accessibilityRole="image"
              accessibilityLabel="Adjunta tu constancia de transferencia"
            />
          </View>
        </View>

        <Text className="mb-6 px-1 text-center text-sm leading-5 text-kambista-navy">
          Adjunta la constancia de tu transferencia para poder verificar tu operación.
        </Text>

        <FilePickerField value={file} onChange={setFile} />

        <View className="mt-6">
          <Text className="mb-2 text-sm font-bold text-kambista-navy">Recuerda</Text>
          <Bullet>
            <Text className="text-sm leading-5 text-kambista-navy">
              El voucher enviado debe tener el{" "}
              <Text className="font-bold">
                monto, datos del beneficiario, fecha y hora.
              </Text>
            </Text>
          </Bullet>
          <Bullet>
            <Text className="text-sm leading-5 text-kambista-navy">
              El voucher debe ser legible
            </Text>
          </Bullet>
          <Bullet last>
            <Text className="text-sm leading-5 text-kambista-navy">
              Archivos permitidos:{" "}
              <Text className="font-bold">PDF, JPG o PNG</Text>
            </Text>
          </Bullet>
        </View>
      </View>

      <View className="w-full">
        <Button
          variant="fill"
          tone="cyanNavy"
          disabled={!file}
          onPress={handleSubmit}
          className="rounded-2xl py-4"
        >
          ENVIAR CONSTANCIA
        </Button>
      </View>
    </View>
  );
}

function Bullet({
  children,
  last,
}: {
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <View className={`flex-row ${last ? "" : "mb-2"}`}>
      <Text className="mr-2 text-sm text-kambista-navy">{"\u2022"}</Text>
      <View className="flex-1">{children}</View>
    </View>
  );
}
