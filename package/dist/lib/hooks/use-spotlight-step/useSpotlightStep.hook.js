import { useCallback, useContext, useEffect, useRef } from "react";
import { SpotlightTourContext } from "../../SpotlightTour.context";
export function useSpotlightStep({ index }) {
    const ref = useRef(null);
    const { changeSpot, current } = useContext(SpotlightTourContext);
    const updateSpot = useCallback(() => {
        if (current === index) {
            ref.current?.measureInWindow((x, y, width, height) => {
                changeSpot({ height, width, x, y });
            });
        }
    }, [changeSpot, current, index]);
    const onLayoutChange = useCallback(() => {
        updateSpot();
    }, [updateSpot]);
    useEffect(() => {
        updateSpot();
    }, [updateSpot]);
    return {
        onLayoutChange,
        updateSpot,
        ref,
    };
}
//# sourceMappingURL=useSpotlightStep.hook.js.map