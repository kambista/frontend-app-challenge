import { useState } from 'react';

export function useCustomPicker<T extends string>(initialValue: T | '') {
  const [selectedValue, setSelectedValue] = useState<T | ''>(initialValue);
  const [isVisible, setIsVisible] = useState(false);
  const [wasTouched, setWasTouched] = useState(false);

  const togglePicker = () => {
    if (isVisible && !selectedValue) {
      setWasTouched(true);
    }
    setIsVisible(!isVisible);
  };

  const selectValue = (value: string) => {
    setSelectedValue(value as T);
    setIsVisible(false);
    setWasTouched(true);
  };

  const markTouched = () => setWasTouched(true);

  return {
    selectedValue,
    selectValue,
    isVisible,
    togglePicker,
    wasTouched,
    markTouched,
  };
}
