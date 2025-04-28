import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
const steps = ["Completa", "Transfiere", "Constancia"];

interface StepperProps {
    activeStep: number; // 0, 1 o 2
}

export const Stepper: React.FC<StepperProps> = ({ activeStep }: StepperProps) => {
    const progress = useSharedValue((activeStep / (steps.length - 1)) * 100);

    useEffect(() => {
        progress.value = withTiming((activeStep / (steps.length - 1)) * 100, {
            duration: 400,
        });
    }, [activeStep]);

    const animatedProgressStyle = useAnimatedStyle(() => ({
        width: `${ progress.value }%`,
    }));
    return (
        <View className="w-full px-2 py-4">
            <View className="flex-row justify-between items-center relative ">
                {steps.map((step, index) => (
                    <View key={step} className={`
                    flex-1 z-10 ${ index === 0 ? 'items-start' : (index === steps.length - 1 ? 'items-end' : 'items-center') }
                    `}>
                        <View className='flex flex-col items-center justify-end '>
                            <View
                                className={`w-4 h-4 rounded-full border-2
                    ${ index <= activeStep ? "bg-primary border-primary" : "bg-white border-gray-300" }
                    `}
                            />
                            <Text
                                className={`
                    text-xs mt-1
                    ${ index === activeStep ? "font-bold text-primary" : "text-gray-400" }
                    `}
                            >
                                {step}
                            </Text>
                        </View>
                    </View>
                ))}

                {/* Línea de progreso detrás */}
                <View className="absolute w-[84%] top-2 left-6 right-2 h-0.5 bg-gray-300 z-0" />

                {/* Línea de progreso animada */}
                <Animated.View
                    style={[animatedProgressStyle]}
                    className="absolute top-2 left-2 h-0.5 bg-primary z-10"
                />
            </View>
        </View >
    );
};