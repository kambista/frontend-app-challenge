import { View, Text, TextInput, StyleSheet } from 'react-native';

interface CustomInputOnboardingProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  secureTextEntry?: boolean;
  infoMessage?: string;
  maxLength?: number;
  onBlur?: () => void;
  isError?: boolean;
  errorMessage?: string;
}

export const CustomInputOnboarding = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
  maxLength,
  onBlur,
  isError = false,
  errorMessage,
}: CustomInputOnboardingProps) => {
  return (
    <View className="mb-4 w-full">
      <Text
        className="text-gray-60 mb-2 font-montserrat-medium"
        style={styles.textLabel}
      >
        {label}
      </Text>
      <View style={[styles.inputContainer, isError && styles.inputError]}>
        <TextInput
          className="font-montserrat-medium"
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#A7A7A7"
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
        />
      </View>
      {isError && errorMessage && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textLabel: {
    fontSize: 14,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#060F26',
    height: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
});
