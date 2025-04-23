import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PhoneSvg } from '../icons/PhoneSvg';
import { CustomButton } from '../ui/CustomButton';

interface SuccessProps {
  username?: string;
}

export const Success = ({ username = 'Ejemplo' }: SuccessProps) => {
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate('Home' as never);
  };

  return (
    <View className="bg-white flex-1 p-6 items-center justify-between">
      <Text
        className="font-montserrat-bold text-secondary mt-6"
        style={{ fontSize: 14 }}
      >
        Perfil creado con éxito
      </Text>

      <View className="items-center justify-center flex-1">
        <View className="mb-6">
          <PhoneSvg />
        </View>

        <Text
          className="font-montserrat-bold text-secondary text-center mb-2"
          style={{ fontSize: 24 }}
        >
          ¡Felicitaciones {username}, tu perfil ha sido creado!
        </Text>

        <Text
          className="font-montserrat-medium text-gray-60 text-center"
          style={{ fontSize: 16 }}
        >
          Ya puedes empezar a Kambiar con la mejor tasa del mercado
        </Text>
      </View>

      <View className="w-full mb-6">
        <CustomButton label="CONTINUAR" onPressFunction={handleContinue} />
      </View>
    </View>
  );
};
