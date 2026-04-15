import type { ViewStyle } from "react-native";

/** Shared UI tokens (matches auth screens placeholder usage). */
export const PLACEHOLDER_GRAY = "#9CA3AF";

/** Soft elevation for main calculator card (iOS + Android). */
export const CARD_ELEVATION_STYLE: ViewStyle = {
  elevation: 6,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 12,
};
