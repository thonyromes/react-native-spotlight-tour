import React from "react";
import { ViewProps } from "react-native";
export interface SpotlightStepProps extends ViewProps {
    index: number;
}
export declare function SpotlightStep({ index, children, ...props }: SpotlightStepProps): React.JSX.Element;
