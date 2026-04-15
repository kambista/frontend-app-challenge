import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type HomeTabBarIconProps = {
  color: string;
  size: number;
};

/**
 * Aproxima el ícono de Inicio del diseño: símbolo $ dentro de un círculo con flechas de sincronía alrededor.
 * Ionicons no expone un solo glifo equivalente; se compone con MaterialCommunityIcons (Expo).
 */
export default function HomeTabBarIcon({ color, size }: HomeTabBarIconProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MaterialCommunityIcons
        name="sync-circle"
        color={color}
        size={size}
        style={{ position: "absolute" }}
      />
      <MaterialCommunityIcons name="currency-usd" color={color} size={size * 0.34} />
    </View>
  );
}
