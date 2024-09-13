import React from "react";
import { View } from "react-native";
import { useSpotlightStep } from "../../hooks/use-spotlight-step/useSpotlightStep.hook";
export function SpotlightStep({ index, children, ...props }) {
    const { onLayoutChange, ref } = useSpotlightStep({ index });
    return (React.createElement(View, { onLayout: onLayoutChange, ref: ref, ...props }, children));
}
//# sourceMappingURL=SpotlightStep.component.js.map