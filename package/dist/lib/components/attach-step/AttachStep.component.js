import React, { cloneElement, useCallback, useContext, useEffect, useRef, } from "react";
import { View } from "react-native";
import { SpotlightTourContext } from "../../SpotlightTour.context";
/**
 * React functional component used to attach and step to another component by
 * only wrapping it. Use its props to customize the behavior.
 *
 * @param props the component props
 * @returns an AttachStep React element
 */
export function AttachStep({ children, fill = false, index }) {
    const { current, changeSpot } = useContext(SpotlightTourContext);
    const ref = useRef(null);
    const updateSpot = useCallback(() => {
        if (current === index) {
            ref.current?.measureInWindow((x, y, width, height) => {
                changeSpot({ height, width, x, y });
            });
        }
    }, [changeSpot, current, index]);
    const onLayout = useCallback((event) => {
        updateSpot();
        children.props.onLayout?.(event);
    }, [updateSpot, children.props.onLayout]);
    useEffect(() => {
        updateSpot();
    }, [updateSpot]);
    if (typeof children.type === "function") {
        const { style, ...rest } = children.props;
        const childStyle = style ?? {};
        return (React.createElement(View, { testID: "attach-wrapper-view", ref: ref, style: { alignSelf: fill ? "stretch" : "flex-start", ...childStyle }, collapsable: false, focusable: false, onLayout: updateSpot }, cloneElement(children, rest, children.props.children)));
    }
    return cloneElement(children, { ...children.props, onLayout, ref }, children.props?.children);
}
//# sourceMappingURL=AttachStep.component.js.map