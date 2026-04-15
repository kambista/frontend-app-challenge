import type { ReactNode } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

type BottomSheetModalProps = {
  visible: boolean;
  onRequestClose: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  title?: string;
  showHeaderActions?: boolean;
  contentMaxHeight?: number;
  children: ReactNode;
};

export default function BottomSheetModal({
  visible,
  onRequestClose,
  onConfirm,
  onCancel,
  confirmLabel = "Aceptar",
  cancelLabel = "Cancelar",
  title,
  showHeaderActions = true,
  contentMaxHeight,
  children,
}: BottomSheetModalProps) {
  const handleDismiss = () => {
    onCancel?.();
    onRequestClose();
  };

  const body =
    contentMaxHeight !== undefined ? (
      <View className="bg-white" style={{ height: contentMaxHeight }}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
          showsVerticalScrollIndicator
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          {children}
        </ScrollView>
      </View>
    ) : (
      children
    );

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={handleDismiss}
    >
      <Pressable className="flex-1 justify-end bg-black/40" onPress={handleDismiss}>
        <Pressable
          className="max-h-[92%] overflow-hidden rounded-t-xl bg-[#F2F2F7]"
          onPress={(e) => e.stopPropagation()}
        >
          {showHeaderActions ? (
            <View className="flex-row items-center justify-between border-b border-gray-200 px-4 py-3">
              <Pressable onPress={() => onConfirm?.()}>
                <Text className="text-base font-semibold text-[#007AFF]">
                  {confirmLabel}
                </Text>
              </Pressable>
              <Pressable onPress={handleDismiss}>
                <Text className="text-base font-semibold text-[#007AFF]">
                  {cancelLabel}
                </Text>
              </Pressable>
            </View>
          ) : (
            <View className="border-b border-gray-200 px-4 py-3">
              {title ? (
                <Text className="text-left text-base font-semibold text-kambista-navy">
                  {title}
                </Text>
              ) : null}
            </View>
          )}
          <View className="bg-white pb-8 pt-2">{body}</View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
