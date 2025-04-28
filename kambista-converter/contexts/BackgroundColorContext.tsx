// src/contexts/BackgroundColorContext.tsx
import { createContext, useContext, useState } from 'react';

type BackgroundColorContextType = {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
};

const BackgroundColorContext = createContext<BackgroundColorContextType>({
  backgroundColor: '#ffffff', // valor inicial
  setBackgroundColor: () => {},
});

export const BackgroundColorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  return (
    <BackgroundColorContext.Provider
      value={{ backgroundColor, setBackgroundColor }}
    >
      {children}
    </BackgroundColorContext.Provider>
  );
};

export const useBackgroundColor = () => useContext(BackgroundColorContext);
