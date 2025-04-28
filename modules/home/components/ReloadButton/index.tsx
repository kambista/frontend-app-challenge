import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { Pressable, View, Animated } from "react-native";
import ReloadIcon from "@/components/Icons/ReloadIcon";

interface ReloadButtonProps {
  onPress: () => void;
}

export interface ReloadButtonRef {
  triggerAnimation: () => void;
}

const ReloadButton = forwardRef<ReloadButtonRef, ReloadButtonProps>(
  ({ onPress }, ref) => {
    const rotation = useRef(new Animated.Value(0)).current;

    const triggerAnimation = () => {
      Animated.sequence([
        Animated.timing(rotation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(rotation, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true
        })
      ]).start();
    };

    useImperativeHandle(ref, () => ({
      triggerAnimation
    }));

    const handlePress = () => {
      triggerAnimation();
      onPress();
    };

    const rotate = rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });

    return (
      <View className="absolute z-10 p-4 bg-black/15 rounded-full top-12 right-[5.5rem]">
        <Pressable className="p-2 bg-white rounded-full" onPress={handlePress}>
          <Animated.View style={{ transform: [{ rotate }] }}>
            <ReloadIcon size={24} color="black" />
          </Animated.View>
        </Pressable>
      </View>
    );
  }
);

export default ReloadButton;
