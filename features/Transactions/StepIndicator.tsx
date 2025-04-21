import React from "react";
import { Text, View } from "react-native";
import { cn } from "../../utils/cn";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

const StepIndicator = ({
  steps,
  currentStep,
  className,
}: StepIndicatorProps) => {
  return (
    <View
      className={cn(
        "flex-row items-center justify-between px-4 pb-6",
        className,
      )}
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isFirst = index === 0;
        const isLast = index === steps.length - 1;

        return (
          <View key={index} className="relative items-center flex-1">
            {!isFirst && (
              <View
                className={cn(
                  "absolute h-0.5 left-0 right-1/2 top-1.5",
                  index <= currentStep ? "bg-[#000823]" : "bg-gray-300",
                )}
              />
            )}

            <View
              className={cn(
                "w-3 h-3 rounded-full mb-1 z-10",
                isActive
                  ? "bg-[#000823]"
                  : isCompleted
                    ? "bg-[#000823]"
                    : "bg-gray-300",
              )}
            />

            {!isLast && (
              <View
                className={cn(
                  "absolute h-0.5 left-1/2 right-0 top-1.5",
                  isCompleted ? "bg-[#000823]" : "bg-gray-300",
                )}
              />
            )}

            <Text
              className={cn(
                "text-xs font-montserrat-bold mt-1",
                isActive || isCompleted ? "text-[#000823]" : "text-gray-400",
              )}
            >
              {step}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default StepIndicator;
