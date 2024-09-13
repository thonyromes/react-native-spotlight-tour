import { ReactElement, ReactNode, RefObject } from "react";
import { LayoutChangeEvent, StyleProp } from "react-native";
export interface ChildProps<T> {
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
    /**
     * The style prop.
     */
    style: StyleProp<T>;
}
export interface AttachStepProps<T> {
    /**
     * The element in which the spotlight will be to wrapped to in the specified
     * step of the tour.
     */
    children: ReactElement<ChildProps<T>>;
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
     */
    index: number;
}
/**
 * React functional component used to attach and step to another component by
 * only wrapping it. Use its props to customize the behavior.
 *
 * @param props the component props
 * @returns an AttachStep React element
 */
export declare function AttachStep<T>({ children, fill, index }: AttachStepProps<T>): ReactElement;
