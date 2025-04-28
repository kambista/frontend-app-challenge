import { View, Text } from 'react-native';
import { BannerIcon } from '../icons/BannerIcon';
import { CustomButton } from '../ui/CustomButton';
import { PigIcon } from '../ui/PigIcon';

interface Props {
  kambistaCode: string;
  amountToReceive: string;
  estimatedTime: string;
  onGoHome: () => void;
}

export const EvidenceSendSuccess: React.FC<Props> = ({
  kambistaCode,
  amountToReceive,
  estimatedTime,
  onGoHome,
}) => {
  return (
    <View className="flex-1 px-4 py-6 ">
      <View className="bg-dark rounded-xl p-6 w-full shadow-sm mb-6">
        <View className="mb-4 items-center justify-center">
          <PigIcon />
        </View>
        <Text
          className="text-secondary pt-4 font-montserrat-bold mb-4"
          style={{ textAlign: 'center', fontSize: 20 }}
        >
          ¡Constancia enviada!
        </Text>

        <View className="h-px w-full bg-gray-200 mb-4" />

        <View className="">
          <Text
            className="text-[#666666] font-montserrat-bold mb-1"
            style={{ fontSize: 14 }}
          >
            Código Kambista
          </Text>
          <Text
            className="text-[#060F26] font-montserrat-bold mb-4"
            style={{ fontSize: 16 }}
          >
            {kambistaCode}
          </Text>
        </View>

        <Text
          className="text-[#666666] text-xs font-montserrat-medium text-start mb-4"
          style={{ fontSize: 14 }}
        >
          *Usa tu código para dar seguimiento a tu operación.
        </Text>

        <View className="flex-col w-full mb-4">
          <Text
            className="text-[#666666] font-montserrat-medium"
            style={{ fontSize: 14 }}
          >
            Monto a recibir
          </Text>
          <Text
            className="text-[#060F26] font-montserrat-bold"
            style={{ fontSize: 16 }}
          >
            {amountToReceive}
          </Text>
        </View>

        <View className="flex-col w-full">
          <Text
            className="text-[#666666] font-montserrat-medium"
            style={{ fontSize: 14 }}
          >
            Tiempo estimado de espera
          </Text>
          <Text
            className="text-[#060F26] text-base font-montserrat-bold"
            style={{ fontSize: 16 }}
          >
            {estimatedTime}
          </Text>
        </View>
      </View>

      <View className="w-full mb-6">
        <BannerIcon />
      </View>

      <Text
        className="text-secondary font-montserrat-medium text-center mb-6"
        style={{ fontSize: 14 }}
      >
        Verificaremos tu operación. Puedes ver su estado en “Mis operaciones”.
      </Text>

      <View className="w-full mb-4">
        <CustomButton label="VOLVER A INICIO" onPressFunction={onGoHome} />
      </View>
    </View>
  );
};
