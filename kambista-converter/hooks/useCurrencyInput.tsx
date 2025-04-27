import { useState } from 'react';

export interface CurrencyOption {
  value: string;
  label: string;
}

export function useCurrencyInput(
  initialAmount = '0',
  options: CurrencyOption[] = [
    { value: 'USD', label: 'Dólares' },
    { value: 'PEN', label: 'Soles' },
  ],
  initialIndex = 0,
) {
  const [amount, setAmount] = useState(initialAmount);
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  const currency = options[selectedIndex].value;
  const currencyLabel = options[selectedIndex].label;

  const toggleCurrency = () =>
    setSelectedIndex((i) => (i + 1) % options.length);

  const setCurrency = (value: string) => {
    const idx = options.findIndex((o) => o.value === value);
    if (idx >= 0) setSelectedIndex(idx);
  };

  return {
    amount,
    setAmount,
    currency,
    currencyLabel,
    toggleCurrency,
    setCurrency,
  };
}
