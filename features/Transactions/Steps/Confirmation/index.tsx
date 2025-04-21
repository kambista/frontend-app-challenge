import { View, Text, Image } from "react-native";
import React from "react";
import Button from "@/components/Button";
import BulletPoint from "./BulletPoint";
import FileInput from "./FileInput";

interface ConfirmationStepProps {
  onContinue: () => void;
}

const ConfirmationStep = ({ onContinue }: ConfirmationStepProps) => {
  return (
    <View className="flex-col gap-6 px-6 pb-6">
      <View className="flex-col items-center gap-3 p-5 bg-white border rounded-lg border-gray-23">
        <Image
          source={require("@/assets/images/invoice.png")}
          className="h-20 w-36"
        />
        <Text className="text-base font-montserrat-light text-primary-dark">
          Adjunta la constancia de tu transferencia para poder verificar tu
          operación.
        </Text>
        <View className="flex-col w-full gap-2 px-4 pt-4 pb-5 border rounded-lg border-gray-23">
          <Text className="text-sm font-montserrat-regular text-primary-dark">
            Sube el archivo de tu constancia
          </Text>
          <FileInput />
        </View>
        <View className="w-full">
          <Text className="text-sm font-montserrat-regular text-[#666666]">
            Recuerda:
          </Text>
          <BulletPoint>
            El voucher enviado debe tener el{" "}
            <Text className="font-montserrat-bold">
              monto, datos,del beneficiario, fecha y hora.
            </Text>
          </BulletPoint>
          <BulletPoint>El voucher debe ser legible.</BulletPoint>
          <BulletPoint>
            Archivos permitidos{" "}
            <Text className="font-montserrat-bold">imágenes, word y PDF.</Text>
          </BulletPoint>
        </View>
      </View>
      <Button size="lg" onPress={onContinue}>
        ENVIAR CONSTANCIA
      </Button>
    </View>
  );
};

export default ConfirmationStep;
