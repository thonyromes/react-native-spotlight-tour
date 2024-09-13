import { arrow, flip, offset, shift, useFloating, } from "@floating-ui/react-native";
import React, { forwardRef, useCallback, useContext, useEffect, useImperativeHandle, useMemo, useRef, } from "react";
import { Animated, Modal, Platform, } from "react-native";
import { Defs, Mask, Rect, Svg } from "react-native-svg";
import { vhDP, vwDP } from "../../../helpers/responsive";
import { SpotlightTourContext, } from "../../SpotlightTour.context";
import { DEFAULT_ARROW, OverlayView, TooltipArrow } from "./TourOverlay.styles";
import { CircleShape } from "./shapes/CircleShape.component";
import { RectShape } from "./shapes/RectShape.component";
export const TourOverlay = forwardRef((props, ref) => {
    const { backdropOpacity, color, current, motion, nativeDriver, onBackdropPress, padding, shape, spot, tourStep, ...tooltipProps } = props;
    const { goTo, next, previous, start, steps, stop, changeSpot } = useContext(SpotlightTourContext);
    const arrowRef = useRef(null);
    const floating = useMemo(() => ({
        arrow: tourStep.arrow ?? tooltipProps.arrow,
        flip: tourStep.flip ?? tooltipProps.flip,
        offset: tourStep.offset ?? tooltipProps.offset,
        placement: tourStep.placement ?? tooltipProps.placement,
        shift: tourStep.shift ?? tooltipProps.shift,
    }), [
        tooltipProps,
        tourStep.arrow,
        tourStep.flip,
        tourStep.offset,
        tourStep.placement,
        tourStep.shift,
    ]);
    const floatingOptions = useMemo(() => {
        return makeFloatingOptions(arrowRef, floating);
    }, [floating]);
    const { refs, floatingStyles, middlewareData, placement } = useFloating(floatingOptions);
    const tooltipOpacity = useRef(new Animated.Value(0));
    const stepMotion = useMemo(() => {
        return tourStep.motion ?? motion;
    }, [tourStep, motion]);
    const stepShape = useMemo(() => {
        return tourStep.shape ?? shape;
    }, [tourStep, shape]);
    const useNativeDriver = useMemo(() => {
        const driverConfig = typeof nativeDriver === "boolean"
            ? { android: nativeDriver, ios: nativeDriver, web: nativeDriver }
            : nativeDriver;
        return Platform.select({
            android: driverConfig.android,
            default: false,
            ios: driverConfig.ios,
            web: false,
        });
    }, [nativeDriver]);
    const ShapeMask = useMemo(() => {
        switch (stepShape) {
            case "circle":
                return CircleShape;
            case "rectangle":
                return RectShape;
        }
    }, [stepShape]);
    const handleBackdropPress = useCallback(() => {
        const handler = tourStep.onBackdropPress ?? onBackdropPress;
        if (handler !== undefined && current !== undefined) {
            switch (handler) {
                case "continue":
                    return next();
                case "stop":
                    return stop();
                default:
                    return handler({
                        current,
                        goTo,
                        next,
                        previous,
                        start,
                        stop,
                        spot,
                        steps,
                        changeSpot,
                    });
            }
        }
    }, [tourStep, onBackdropPress, current, goTo, next, previous, start, stop]);
    useEffect(() => {
        const { height, width } = spot;
        if ([height, width].every((value) => value > 0)) {
            Animated.timing(tooltipOpacity.current, {
                delay: 400,
                duration: 400,
                toValue: 1,
                useNativeDriver,
            }).start();
        }
    }, [spot, useNativeDriver]);
    useImperativeHandle(ref, () => ({
        hideTooltip: () => {
            return new Promise((resolve) => {
                if (current !== undefined) {
                    Animated.timing(tooltipOpacity.current, {
                        duration: 400,
                        toValue: 0,
                        useNativeDriver,
                    }).start(resolve);
                }
                else {
                    resolve({ finished: true });
                }
            });
        },
    }), [current, useNativeDriver]);
    return (React.createElement(Modal, { animationType: "fade", presentationStyle: "overFullScreen", transparent: true, visible: current !== undefined },
        React.createElement(OverlayView, { testID: "Overlay View" },
            React.createElement(Svg, { testID: "Spot Svg", height: "100%", width: "100%", viewBox: `0 0 ${vwDP(100)} ${vhDP(100)}`, onPress: handleBackdropPress, shouldRasterizeIOS: true, renderToHardwareTextureAndroid: true },
                React.createElement(Defs, null,
                    React.createElement(Mask, { id: "mask", x: 0, y: 0, height: "100%", width: "100%" },
                        React.createElement(Rect, { height: "100%", width: "100%", fill: "#fff" }),
                        React.createElement(ShapeMask, { spot: spot, setReference: refs.setReference, motion: stepMotion, padding: padding, useNativeDriver: useNativeDriver }))),
                React.createElement(Rect, { height: "100%", width: "100%", fill: color, mask: "url(#mask)", opacity: backdropOpacity })),
            current !== undefined && (React.createElement(Animated.View, { ref: refs.setFloating, testID: "Tooltip View", style: { ...floatingStyles, opacity: tooltipOpacity.current } },
                React.createElement(tourStep.render, { current: current, isFirst: current === 0, isLast: current === steps.length - 1, next: next, previous: previous, stop: stop, goTo: goTo }),
                floating.arrow !== false && (React.createElement(TooltipArrow, { ref: arrowRef, placement: placement, data: middlewareData.arrow, arrow: floating.arrow === true ? undefined : floating.arrow })))))));
});
function makeFloatingOptions(arrowRef, props) {
    const arrowOption = typeof props?.arrow === "boolean" ? DEFAULT_ARROW : props?.arrow;
    const { size } = typeof arrowOption === "number"
        ? { ...DEFAULT_ARROW, size: arrowOption }
        : { ...DEFAULT_ARROW, ...arrowOption };
    const baseOffset = props?.offset || 4;
    const offsetValue = props?.arrow !== false
        ? Math.sqrt(2 * size ** 2) / 2 + baseOffset
        : baseOffset;
    const arrowMw = props?.arrow !== false ? arrow({ element: arrowRef }) : undefined;
    const flipMw = props?.flip !== false
        ? flip(props?.flip === true ? undefined : props?.flip)
        : undefined;
    const offsetMw = props?.offset !== 0 ? offset(offsetValue) : undefined;
    const shiftMw = props?.shift !== false
        ? shift(typeof props?.shift === "object" ? props.shift : { padding: 8 })
        : undefined;
    return {
        middleware: [flipMw, offsetMw, shiftMw, arrowMw].filter(Boolean),
        placement: props?.placement,
    };
}
//# sourceMappingURL=TourOverlay.component.js.map