import { Alert } from 'react-native';
import { useLoginForm } from './useLoginForm';

export function useSubmit() {
  const validate = useLoginForm((s) => s.validate);
  const resetErrors = useLoginForm((s) => s.resetErrors);
  return () => {
    resetErrors();
    if (validate()) {
      Alert.alert('✅ Login válido');
    }
  };
}
