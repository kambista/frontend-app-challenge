import { cn } from "@/utils/cn";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { SafeAreaView as SafeAreaContext } from "react-native-safe-area-context";

interface ScreenWrapperProps {
  children: React.ReactNode;
  scrollEnabled?: boolean;
  safeViewTopClassName?: string;
  safeViewBottomClassName?: string;
}

export function ScreenWrapper({
  children,
  scrollEnabled = false,
  safeViewTopClassName,
  safeViewBottomClassName
}: ScreenWrapperProps) {
  return (
    <>
      <SafeAreaContext
        className={cn("flex-1", safeViewTopClassName)}
        edges={["top"]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1"
        >
          <TouchableWithoutFeedback
            onPress={(event) => {
              if (event.target === event.currentTarget) Keyboard.dismiss();
            }}
            accessible={false}
          >
            {scrollEnabled ? (
              <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
              >
                {children}
              </ScrollView>
            ) : (
              <View className="flex-1">{children}</View>
            )}
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaContext>
      <SafeAreaContext edges={["bottom"]} className={safeViewBottomClassName} />
    </>
  );
}
