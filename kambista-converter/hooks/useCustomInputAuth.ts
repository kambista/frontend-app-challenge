import { useLoginForm } from './useLoginForm';

type Field = 'email' | 'password';

export const useCustomInputAuth = (field: Field) => {
  const value = useLoginForm((s) => s[field]);
  const setValue = useLoginForm((s) =>
    field === 'email' ? s.setEmail : s.setPassword,
  );
  const error = useLoginForm((s) => s.errors[field]);
  const label = field === 'email' ? 'Correo electrónico' : 'Contraseña';
  const placeholder =
    field === 'email' ? 'Escribe tu correo' : 'Escribe tu contraseña';
  const secure = field === 'password';
  return { label, value, onChangeText: setValue, placeholder, secure, error };
};
