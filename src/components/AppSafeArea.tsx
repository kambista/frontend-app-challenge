import type { ReactNode } from "react";
import {
  ScrollView,
  type ScrollViewProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const defaultContentContainerStyle: ViewStyle = {
  flexGrow: 1,
  paddingHorizontal: 32,
  paddingBottom: 32,
  paddingTop: 32,
};

type AppSafeAreaProps = {
  children: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  edges?: React.ComponentProps<typeof SafeAreaView>["edges"];
  outerClassName?: string;
} & Omit<ScrollViewProps, "contentContainerStyle" | "children">;

export default function AppSafeArea({
  children,
  edges = ["top", "bottom"],
  contentContainerStyle,
  outerClassName = "flex-1 bg-white",
  ...scrollViewProps
}: AppSafeAreaProps) {
  return (
    <SafeAreaView className={outerClassName} edges={edges}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={[
          defaultContentContainerStyle,
          contentContainerStyle,
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        {...scrollViewProps}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
