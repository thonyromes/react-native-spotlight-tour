import { MiddlewareData, Placement } from "@floating-ui/react-native";
import { View } from "react-native";
import { Optional } from "../../../helpers/common";
import { ArrowOptions } from "../../SpotlightTour.context";
interface TooltipArrowProps {
    arrow: Optional<number | ArrowOptions>;
    data: Optional<MiddlewareData["arrow"]>;
    placement: Placement;
}
export declare const DEFAULT_ARROW: Required<ArrowOptions>;
export declare const OverlayView: import("styled-components/native").IStyledComponent<"native", import("styled-components/native/dist/types").FastOmit<import("react-native").ViewProps, never>>;
export declare const TooltipArrow: import("styled-components/native").IStyledComponent<"native", import("styled-components/native/dist/types").Substitute<import("react-native").ViewProps & import("react").RefAttributes<View>, TooltipArrowProps>>;
export {};
