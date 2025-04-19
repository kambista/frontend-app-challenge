import React from 'react';
import { View } from 'react-native';

interface CardContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function CardContainer({ children, className = '' }: CardContainerProps) {
  return (
    <View className={`border border-gray-300 rounded-xl py-4 px-5 bg-white ${className}`}>
      {children}
    </View>
  );
}