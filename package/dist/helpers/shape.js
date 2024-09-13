import { Animated } from "react-native";
export function transitionOf(options) {
    const { motion, nextOrigin, nextSize, opacity, origin, size, useNativeDriver, } = options;
    switch (motion) {
        case "bounce":
            opacity.current.setValue(1);
            return Animated.parallel([
                Animated.spring(origin.current, {
                    damping: 45,
                    mass: 4,
                    stiffness: 350,
                    toValue: nextOrigin,
                    useNativeDriver,
                }),
                Animated.spring(size.current, {
                    damping: 35,
                    mass: 4,
                    stiffness: 350,
                    toValue: nextSize,
                    useNativeDriver,
                }),
            ]);
        case "fade":
            return Animated.sequence([
                Animated.timing(opacity.current, {
                    duration: 400,
                    toValue: 0,
                    useNativeDriver,
                }),
                Animated.parallel([
                    Animated.timing(origin.current, {
                        duration: 0,
                        toValue: nextOrigin,
                        useNativeDriver,
                    }),
                    Animated.timing(size.current, {
                        duration: 0,
                        toValue: nextSize,
                        useNativeDriver,
                    }),
                ]),
                Animated.timing(opacity.current, {
                    duration: 400,
                    toValue: 1,
                    useNativeDriver,
                }),
            ]);
        case "slide":
            opacity.current.setValue(1);
            return Animated.parallel([
                Animated.timing(origin.current, {
                    duration: 400,
                    toValue: nextOrigin,
                    useNativeDriver,
                }),
                Animated.timing(size.current, {
                    duration: 400,
                    toValue: nextSize,
                    useNativeDriver,
                }),
            ]);
    }
}
//# sourceMappingURL=shape.js.map