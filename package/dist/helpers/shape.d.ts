import { MutableRefObject } from "react";
import { Animated, LayoutRectangle, MeasureInWindowOnSuccessCallback } from "react-native";
import { Motion } from "../lib/SpotlightTour.context";
interface RefNode {
    measure: (callback: MeasureInWindowOnSuccessCallback) => void;
}
export interface ShapeProps {
    motion: Motion;
    padding: number;
    setReference: (node?: RefNode) => void;
    spot: LayoutRectangle;
    useNativeDriver: boolean;
}
interface Point {
    x: number;
    y: number;
}
interface BaseTransitionOptions {
    motion: Motion;
    nextOrigin: Point;
    opacity: MutableRefObject<Animated.Value>;
    origin: MutableRefObject<Animated.ValueXY>;
    useNativeDriver: boolean;
}
interface ValueTransitionOptions extends BaseTransitionOptions {
    nextSize: number;
    size: MutableRefObject<Animated.Value>;
}
interface PointTransitionOptions extends BaseTransitionOptions {
    nextSize: Point;
    size: MutableRefObject<Animated.ValueXY>;
}
type TransitionOptions = ValueTransitionOptions | PointTransitionOptions;
export declare function transitionOf(options: TransitionOptions): Animated.CompositeAnimation;
export {};
