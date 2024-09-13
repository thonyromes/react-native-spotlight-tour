import { View } from "react-native";
export interface UseSpotlightStepProps {
    index: number;
}
export declare function useSpotlightStep({ index }: UseSpotlightStepProps): {
    onLayoutChange: () => void;
    updateSpot: () => void;
    ref: import("react").RefObject<View>;
};
