import { Octicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';

interface InfoCardProps {
  color?: 'blue' | 'orange';
  content: string;
  className?: string;
}

export default function InfoCard({ color = 'blue', content, className }: InfoCardProps) {
  const bgColor = color === 'blue' ? 'bg-blue-100' : 'bg-orange-100';
  const iconColor = color === 'blue' ? 'text-blue-600' : 'text-orange-600';

  const renderFormattedText = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, index) => 
      index % 2 === 1 ? (
        <Text key={index} className="font-mbold">{part}</Text>
      ) : (
        <Text key={index}>{part}</Text>
      )
    );
  };

  return (
    <View className={`${bgColor} rounded-xl flex-row px-6 py-4 mb-4 items-center ${className}`}>
      <Octicons name='info' size={18} className={`mr-3 ${iconColor}`} />
      <Text className="text-gray-800 flex-1 font-mregular text-sm">
        {renderFormattedText(content)}
      </Text>
    </View>
  );
}