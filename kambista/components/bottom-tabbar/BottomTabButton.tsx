import { TouchableOpacity, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import React, { useEffect } from 'react';

type BottomTabButtonProps = {
  isFocused: boolean;
  label: string;
  icon: React.ReactNode;
  color: string;
  navigation: any;
  route: any;
};

const BottomTabButton = ({ isFocused, label, icon, color, navigation, route }: BottomTabButtonProps) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, { duration: 350 });
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(scale.value, [0, 0.8], [0.85, 1]) }],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scale.value, [0, 1], [0, 1]),
  }));

  const handlePress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  };

  const handleLongPress = () => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} onLongPress={handleLongPress} className="flex-1 justify-center items-center">
      {/* <Animated.View className="h-0.5 bg-black w-7" style={[animatedTextStyle]} /> */}
      <View className="my-1.5" />
      <Animated.View style={[animatedIconStyle]}>{icon}</Animated.View>
      <View className="my-0.5" />
      <Animated.Text className={`text-[${color}] text-xs font-qmedium`} style={[animatedTextStyle]}>
        {label}
      </Animated.Text>
      <View className="my-1.5" />
    </TouchableOpacity>
  );
};

export default BottomTabButton;
