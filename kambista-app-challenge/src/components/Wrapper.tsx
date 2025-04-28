import { View, SafeAreaView, ScrollView, ViewProps } from 'react-native';
import { ReactNode } from 'react';

interface ScreenWrapperProps extends ViewProps {
  children: ReactNode;
  scrollable?: boolean;
}

export function ScreenWrapper({ children, scrollable = true, ...props }: ScreenWrapperProps) {
  if (scrollable) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          className='py-3 px-5'
          {...props}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" {...props}>
      <View className="flex-1 py-3 px-5">{children}</View>
    </SafeAreaView>
  );
}
