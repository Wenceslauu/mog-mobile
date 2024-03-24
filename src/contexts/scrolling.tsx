import { createContext } from "react";
import { Animated } from "react-native";

type ScrollingContextData = {
  scrollY: Animated.Value;
};

export const ScrollingContext = createContext<ScrollingContextData>(
  {} as ScrollingContextData
);
