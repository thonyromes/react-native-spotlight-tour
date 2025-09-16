import { responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions";

import type { SafeAreaInsets } from "../lib/SpotlightTour.context";

export function vw(percentage: number, safeAreaInsets?: SafeAreaInsets): number {
  const screenWidth = responsiveScreenWidth(percentage);
  
  if (safeAreaInsets) {
    const availableWidth = responsiveScreenWidth(100) - safeAreaInsets.left - safeAreaInsets.right;
    return (availableWidth * percentage) / 100;
  }
  
  return screenWidth;
}

export function vh(percentage: number, safeAreaInsets?: SafeAreaInsets): number {
  const screenHeight = responsiveScreenHeight(percentage);
  
  if (safeAreaInsets) {
    const availableHeight = responsiveScreenHeight(100) - safeAreaInsets.top - safeAreaInsets.bottom;
    return (availableHeight * percentage) / 100;
  }
  
  return screenHeight;
}

/**
 * Get safe area adjusted viewport width
 */
export function safeVw(percentage: number, safeAreaInsets: SafeAreaInsets): number {
  return vw(percentage, safeAreaInsets);
}

/**
 * Get safe area adjusted viewport height
 */
export function safeVh(percentage: number, safeAreaInsets: SafeAreaInsets): number {
  return vh(percentage, safeAreaInsets);
}
