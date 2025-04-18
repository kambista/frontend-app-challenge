import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome6, Octicons } from '@expo/vector-icons';

type Step = {
  title: string;
};

type StepperProps = {
  steps: Step[];
  activeStep?: number;
  onStepChange?: (step: number) => void;
  stepColor?: string;
  inactiveStepColor?: string;
};

export default function Stepper({ steps, activeStep = 0, onStepChange, stepColor = 'bg-black', inactiveStepColor = 'bg-gray-200' }: StepperProps) {
  const handleStepPress = (index: number) => {
    if (onStepChange) {
      onStepChange(index);
    }
  };

  return (
    <View className="w-full px-4">
      {/* Stepper Line and Steps */}
      <View className="flex-row justify-between items-center relative mb-6">
        {/* Background line */}
        <View className={`absolute h-1 ${inactiveStepColor} w-full top-5.5 z-0`} />

        {/* Progress line */}
        <View
          className={`absolute h-1 ${stepColor} top-5.5 z-10`}
          style={{
            width: `${(activeStep / (steps.length - 1)) * 100}%`,
          }}
        />

        {steps.map((step, index) => {
          const isActive = index <= activeStep;
          const isCurrent = index === activeStep;

          return (
            <View key={index} className="z-20 items-center">
              <View className={`aspect-square w-4 rounded-full items-center justify-center ${isActive ? stepColor : inactiveStepColor}`} />

              {/* Step Label */}
              <View className="absolute -bottom-6 w-24 items-center">
                <Text className={`text-sm ${isCurrent ? 'text-black font-mbold' : 'text-gray-400 font-msemibold'}`}>{step.title}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
