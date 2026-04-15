import { useState } from "react";
import { LayoutChangeEvent, Text, View } from "react-native";

const LABELS = ["Completa", "Transfiere", "Constancia"] as const;

/** Column width for each step dot — line runs center-to-center (first ↔ last). */
const STEP_COL_W = 56;
const LINE_INSET = STEP_COL_W / 2;

const NAVY = "#0A1F33";
const TRACK_GRAY = "#E5E7EB";
const DOT_INACTIVE = "#D1D5DB";
const LABEL_INACTIVE = "#9CA3AF";

type StepperHeaderProps = {
  activeStep: 1 | 2 | 3;
};

/** Progress line extends to ~first third / halfway / full, matching the mockup connector fill. */
function progressFraction(step: 1 | 2 | 3): number {
  if (step === 1) return 0.28;
  if (step === 2) return 0.62;
  return 1;
}

export default function StepperHeader({ activeStep }: StepperHeaderProps) {
  const [trackWidth, setTrackWidth] = useState(0);

  const onTrackLayout = (e: LayoutChangeEvent) => {
    setTrackWidth(e.nativeEvent.layout.width);
  };

  const innerW =
    trackWidth > 0 ? Math.max(0, trackWidth - STEP_COL_W) : 0;
  const progressW =
    innerW > 0 ? Math.round(innerW * progressFraction(activeStep)) : 0;

  return (
    <View className="mb-6 px-1">
      <View className="relative h-[34px] justify-center" onLayout={onTrackLayout}>
        {/* Baseline only between 1st and 3rd dot centers (no stubs past labels) */}
        {innerW > 0 ? (
          <View
            className="absolute rounded-full"
            style={{
              left: LINE_INSET,
              width: innerW,
              top: "50%",
              marginTop: -1.5,
              height: 3,
              backgroundColor: TRACK_GRAY,
            }}
          />
        ) : null}
        {innerW > 0 && progressW > 0 ? (
          <View
            className="absolute rounded-full"
            style={{
              left: LINE_INSET,
              width: progressW,
              top: "50%",
              marginTop: -1.5,
              height: 3,
              backgroundColor: NAVY,
            }}
          />
        ) : null}

        {/* Step dots — centered on the track */}
        <View className="flex-row items-center justify-between">
          {LABELS.map((_, i) => {
            const step = (i + 1) as 1 | 2 | 3;
            const isActive = activeStep === step;
            const isDone = activeStep > step;
            return (
              <View key={step} className="items-center" style={{ width: STEP_COL_W }}>
                <View
                  className="rounded-full"
                  style={{
                    width: isActive ? 14 : 12,
                    height: isActive ? 14 : 12,
                    backgroundColor:
                      isActive || isDone ? NAVY : DOT_INACTIVE,
                  }}
                />
              </View>
            );
          })}
        </View>
      </View>

      <View className="mt-2.5 flex-row">
        {LABELS.map((label, i) => {
          const step = (i + 1) as 1 | 2 | 3;
          const isActive = activeStep === step;
          const isDone = activeStep > step;
          const labelNavy = isActive || isDone;
          return (
            <View
              key={label}
              className="flex-1 items-center px-0.5"
              style={{ minWidth: 0 }}
            >
              <Text
                className={`text-center text-xs ${isActive ? "font-bold" : "font-normal"}`}
                style={{ color: labelNavy ? NAVY : LABEL_INACTIVE }}
                numberOfLines={1}
              >
                {label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
