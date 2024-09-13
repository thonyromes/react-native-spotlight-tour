import { useCallback, useContext, useEffect, useRef } from "react";
import { View } from "react-native";
import { SpotlightTourContext } from "../../SpotlightTour.context";

export interface UseSpotlightStepProps {
  index: number;
}

export function useSpotlightStep({ index }: UseSpotlightStepProps) {
  const ref = useRef<View>(null);

  const { changeSpot, current } = useContext(SpotlightTourContext);

  const updateSpot = useCallback((): void => {
    if (current === index) {
      ref.current?.measureInWindow((x, y, width, height) => {
        changeSpot({ height, width, x, y });
      });
    }
  }, [changeSpot, current, index]);

  const onLayoutChange = useCallback((): void => {
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
