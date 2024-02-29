import { createContext } from "react";
import { Animated } from "react-native";

type HomeContextData = {
  scrollY: Animated.Value;
};

export const HomeContext = createContext<HomeContextData>(
  {} as HomeContextData
);
