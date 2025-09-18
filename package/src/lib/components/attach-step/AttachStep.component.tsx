import {
  type ReactElement,
  type ReactNode,
  type RefObject,
  cloneElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";

import { SpotlightTourContext } from "../../SpotlightTour.context";

import type { LayoutChangeEvent, StyleProp, View, ViewStyle } from "react-native";

export interface ChildProps {
  /**
   * A React children, if any.
   */
  children?: ReactNode;
  /**
   * Native components layout change event.
   *
   * @param event The layout event.
   */
  onLayout?: (event: LayoutChangeEvent) => void;
  /**
   * A React reference.
   */
  ref: RefObject<unknown>;
}

export interface AttachStepProps {
  /**
   * The element in which the spotlight will be to wrapped to in the specified
   * step of the tour.
   */
  children: ReactElement<ChildProps>;
  /**
   * When `AttachStep` wraps a Functional Component, it needs to add an
   * additional `View` on top of it to be able to measure the layout upon
   * render. This prop allows to define the behavior of the width of such
   * `View`. When set to `false`, it adjusts to its contents, when set to
   * `true`, it stretches out and tries to fill it view.
   *
   * **Note:** This property has no effect when it's applied to native
   * components or components created using `React.forwardRef`, which pass
   * the `ref` to another native component.
   *
   * @default false
   */
  fill?: boolean;
  /**
   * The index of the `steps` array to which the step is attached to.
   * It can be a single index or multiple ones.
   */
  index: Array<number> | number;
  /**
   * Style applied to AttachStep wrapper
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * React functional component used to attach and step to another component by
 * only wrapping it. Use its props to customize the behavior.
 *
 * @param props the component props
 * @returns an AttachStep React element
 */
export function AttachStep({ children, index }: AttachStepProps): ReactElement {
  const { changeSpot, current, safeAreaInsets, useSafeArea } = useContext(SpotlightTourContext);

  const ref = useRef<View>(null);

  const updateSpot = useCallback((): void => {
    const indexes = typeof index === "number" ? [index] : index;

    if (current !== undefined && indexes.includes(current)) {
      ref.current?.measureInWindow((x, y, width, height) => {
        if (useSafeArea && safeAreaInsets) {
          const adjustedY = y + (safeAreaInsets?.top ?? 0);
          changeSpot({ height, width, x, y: adjustedY });
        } else {
          changeSpot({ height, width, x, y });
        }
      });
    }
  }, [changeSpot, current, JSON.stringify(index), useSafeArea, safeAreaInsets]);

  const onLayout = useCallback((event: LayoutChangeEvent): void => {
    updateSpot();
    children.props.onLayout?.(event);
  }, [updateSpot, children.props.onLayout]);

  useEffect(() => {
    updateSpot();
  }, [updateSpot]);

  return cloneElement(
    children,
    { ...children.props, onLayout, ref },
    children.props?.children,
  );
}
