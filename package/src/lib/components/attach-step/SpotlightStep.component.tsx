import React from "react";
import { View, ViewProps } from "react-native";
import { useSpotlightStep } from "../../hooks/use-spotlight-step/useSpotlightStep.hook";

export interface SpotlightStepProps extends ViewProps {
  index: number;
}

export function SpotlightStep({
  index,
  children,
  ...props
}: SpotlightStepProps) {
  const { onLayoutChange, ref } = useSpotlightStep({ index });

  return (
    <View onLayout={onLayoutChange} ref={ref} {...props}>
      {children}
    </View>
  );
}
