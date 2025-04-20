import React from 'react';
import { Text, Pressable, StyleSheet, View } from 'react-native';

interface Props {
  label: string;
  onPressFunction: () => void;
}

export const CustomButton = ({ label, onPressFunction }: Props) => {
  return (
    <Pressable onPress={onPressFunction}>
      {({ pressed }) => (
        <View
          style={[
            styles.button,
            { backgroundColor: pressed ? '#b2e7df' : '#00e3c2' },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              pressed ? { opacity: 0.5 } : { color: '#000000' },
            ]}
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
    color: '#000000',
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
});
