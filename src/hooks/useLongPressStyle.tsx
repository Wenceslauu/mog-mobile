import { useRef } from "react";
import { Animated } from "react-native";

// https://easings.net/#easeInQuint
function easeInQuint(x: number): number {
  return x * x * x * x * x;
}

export default function useLongPressStyle() {
  let pressTimer: NodeJS.Timeout | null;
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;

  const animateIn = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: easeInQuint,
      }),
      Animated.timing(scale, {
        toValue: 1.03,
        duration: 300,
        useNativeDriver: true,
        easing: easeInQuint,
      }),
    ]).start();
  };

  const handlePressIn = () => {
    opacity.setValue(0.5);

    pressTimer = setTimeout(animateIn, 200);
  };

  const animateOut = () => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    opacity.setValue(1);

    clearTimeout(pressTimer as NodeJS.Timeout);
    animateOut();
  };

  return {
    opacity,
    scale,
    handlePressIn,
    handlePressOut,
  };
}
