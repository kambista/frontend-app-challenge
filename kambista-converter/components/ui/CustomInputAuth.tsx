import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface Props {
  placeholder?: string;
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  rightIcon?: React.ReactNode;
  onIconPress?: () => void;
  testID?: string;
}

export const CustomInputAuth = ({
  placeholder = '',
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  rightIcon,
  onIconPress,
  testID,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text
        style={styles.label}
        className="text-gray-60 font-montserrat-medium"
      >
        {label}
      </Text>
      <View style={[styles.inputContainer, error && styles.inputError]}>
        <TextInput
          className="font-montserrat-medium"
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#A7A7A7"
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          autoCorrect={false}
          testID={testID}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onIconPress} style={styles.iconButton}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    width: '100%',
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
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
  input: {
    flex: 1,
    fontSize: 14,
    color: '#060F26',
    height: '100%',
    fontFamily: 'montserrat-medium',
  },
  iconButton: {
    padding: 8,
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
