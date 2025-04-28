import { View, Text, StyleSheet } from 'react-native';
import { InfoIcon } from '../icons/InfoIcon';
import { AlertIcon } from '../icons/AlertIcon';

type Variant = 'info' | 'warning';

const VARIANT_MAP: Record<
  Variant,
  { container: string; text: string; Icon: React.FC }
> = {
  info: {
    container: 'bg-blue-lighter',
    text: 'text-blue-dark',
    Icon: InfoIcon,
  },
  warning: {
    container: 'bg-brown-lighter',
    text: 'text-brown-dark',
    Icon: AlertIcon,
  },
};

interface Props {
  message?: string;
  variant?: Variant;
  style?: object;
  textStyle?: object;
}

export const MessageBox = ({
  message = 'Tu documento de identidad debe coincidir con tus datos para evitar inconvenientes al momento de hacer una primera operación',
  variant = 'info',
  style,
  textStyle,
}: Props) => {
  const { container, text, Icon } = VARIANT_MAP[variant];

  return (
    <View
      className={`flex-row items-center ${container} py-4 px-4 mt-1 mb-4 rounded-md`}
      style={style}
    >
      <Icon />
      <Text
        className={`${text} ml-2 flex-1 font-montserrat-medium text-justify`}
        style={[styles.textInfo, textStyle]}
      >
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textInfo: { fontSize: 12 },
});
