import { Text, Pressable, StyleSheet, View, ViewStyle } from 'react-native';

interface Props {
  label: string;
  onPressFunction: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textColor?: string;
}

export const CustomButton = ({
  label,
  onPressFunction,
  disabled = false,
  style,
  textColor = '#060F26',
}: Props) => {
  return (
    <Pressable onPress={onPressFunction} disabled={disabled}>
      {({ pressed }) => (
        <View
          style={[
            styles.button,
            style,
            { backgroundColor: pressed ? '#b2e7df' : '#00e3c2' },
            disabled && { opacity: 0.4 },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              pressed ? { opacity: 0.5 } : {},
              { color: textColor },
            ]}
            className="font-montserrat-medium"
          >
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    height: 56,
    width: '100%',
  },
  buttonText: {
    fontSize: 14,
    textTransform: 'uppercase',
  },
});
