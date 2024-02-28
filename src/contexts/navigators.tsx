import { createContext } from "react";
import { Animated } from "react-native";

type HomeContextData = {
  scrolling: Animated.Value;
};

export const HomeContext = createContext<HomeContextData>(
  {} as HomeContextData
);
