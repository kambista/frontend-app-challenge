import { View, Text } from 'react-native';
import { PhoneSvg } from '../icons/PhoneSvg';
import { CustomButton } from '../ui/CustomButton';
import { useRouter } from 'expo-router';

interface SuccessProps {
  username?: string;
}

export const Success = ({ username = 'Ejemplo' }: SuccessProps) => {
  const router = useRouter();

  const handleContinue = () => router.replace('/(tabs)');

  return (
    <View className="flex-1 bg-white">
      <Text
        className="pt-4 pb-24 text-center font-montserrat-bold text-secondary"
        style={{ fontSize: 14 }}
      >
        Perfil creado con éxito
      </Text>

      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          marginBottom: 40,
        }}
      >
        <PhoneSvg />

        <Text
          className="font-montserrat-bold text-secondary text-center"
          style={{ fontSize: 24 }}
        >
          ¡Felicitaciones {username},tu perfil ha sido creado!
        </Text>

        <Text className="font-montserrat-medium text-gray-60 text-center text-[16px] leading-[22px]">
          Ya puedes empezar a{' '}
          <Text className="font-montserrat-italic">Kambiar</Text> con la mejor
          tasa del mercado
        </Text>
      </View>

      <CustomButton label="CONTINUAR" onPressFunction={handleContinue} />
    </View>
  );
};
