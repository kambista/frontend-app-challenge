import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  ViewProps
} from "react-native";
import React from "react";

type DismissKeyboardViewProps = {
  children: React.ReactNode;
  keyboardVerticalOffset?: number;
} & ViewProps;

export default function DismissKeyboardView({
  children,
  keyboardVerticalOffset = 0,
  ...props
}: DismissKeyboardViewProps) {
  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <SafeAreaView style={[{ flex: 1 }, props.style]}>
            {children}
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
