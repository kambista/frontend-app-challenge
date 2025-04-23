import { useState, useEffect } from 'react';

interface UseCustomInputOnboardingProps {
  initialValue?: string;
  validator?: (value: string) => boolean;
  errorMessage?: string;
}

export const useCustomInputOnboarding = ({
  initialValue = '',
  validator,
  errorMessage = 'Campo inválido',
}: UseCustomInputOnboardingProps = {}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!validator) {
      setError(false);
      return;
    }
    if (value.trim() === '') {
      setError(false);
    } else {
      setError(!validator(value));
    }
  }, [value, validator]);

  const handleChange = (text: string) => {
    setValue(text);
  };

  const handleBlur = () => {};

  const reset = () => {
    setValue(initialValue);
    setError(false);
  };

  return {
    value,
    error,
    errorMessage: error ? errorMessage : undefined,
    handleChange,
    handleBlur,
    reset,
    isValid: !error && (validator ? validator(value) : true),
  };
};
