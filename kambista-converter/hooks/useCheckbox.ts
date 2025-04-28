import { useLoginForm } from './useLoginForm';

export function useCheckbox() {
  const checked = useLoginForm((s) => s.rememberMe);
  const toggle = useLoginForm((s) => s.setRememberMe);
  return { checked, onPress: () => toggle(!checked) };
}
