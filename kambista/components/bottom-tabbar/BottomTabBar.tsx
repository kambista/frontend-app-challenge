import React, { View } from "react-native";
// import { useUIStore } from "@/store/uiStore";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import BottomTabButton from "./BottomTabButton";

const BottomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  // const { isTabBarVisible } = useUIStore();

  // if (!isTabBarVisible) {
  //   return null;
  // }

  return (
    <View
      className="absolute bottom-0 mx-0 flex flex-row justify-between items-center bg-white"
      style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}
    >
      {state.routes.map((route, index) => {
        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const { options } = descriptors[route.key];

        const activeColor = options.tabBarActiveTintColor || "black";
        const inactiveColor = options.tabBarInactiveTintColor || "#737373";

        const label = options.title ?? route.name;
        const isFocused = state.index === index;
        const icon = options.tabBarIcon?.({
          focused: isFocused,
          color: isFocused ? activeColor : inactiveColor,
        });

        return (
          <BottomTabButton
            key={route.name}
            label={label}
            isFocused={isFocused}
            color={isFocused ? activeColor : inactiveColor}
            navigation={navigation}
            route={route}
            icon={icon}
          />
        );
      })}
    </View>
  );
};

export default BottomTabBar;
