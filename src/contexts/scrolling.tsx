import { RefObject, createContext } from "react";
import { Animated, ScrollView } from "react-native";

type ScrollingContextData = {
  scrollY: Animated.Value;

  /**
   * Refs to keep the scroll views that are part of the parallax header in sync
   */
  scrollViewRefs?: RefObject<ScrollView>[];
};

export const ScrollingContext = createContext<ScrollingContextData>(
  {} as ScrollingContextData
);
