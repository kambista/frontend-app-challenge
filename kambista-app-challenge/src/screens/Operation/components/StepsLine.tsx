import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { operationSteps, Step } from './Steps';

interface Props {
  currentStep: Step,
}

const ProgressSteps = ({currentStep}: Props) => {

  return (
    <View className="p-6">
      <View className="flex-row items-center justify-between w-full mb-3">
        {operationSteps.map((step, index) => (
          <View className={`relative flex items-center justify-center w-1/3`} key={step.index}>
            {index < operationSteps.length - 1 && (
              <View
                className={`absolute top-1 left-1/2 w-full h-1 ${index < currentStep.index ? 'bg-secondary' : 'bg-gray-300'}`}
              />
            )}
            <View
              className={`w-3 h-3 rounded-full ${index <= currentStep.index ? 'bg-secondary' : 'bg-gray-400'} border-white`}
            />
            <Text className="mt-1 text-center text-xs font-mont">
              {step.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ProgressSteps;
