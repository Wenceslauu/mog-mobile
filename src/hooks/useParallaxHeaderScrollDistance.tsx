import PARALLAX_HEADER_MAX_HEIGHT from "@/constants/parallaxHeaderMaxHeight";
import { getDefaultHeaderHeight } from "@react-navigation/elements";
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function useParallaxHeaderScrollDistance() {
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();

  const PARALLAX_HEADER_MIN_HEIGHT = getDefaultHeaderHeight(
    frame,
    false,
    insets.top
  );
  const PARALLAX_HEADER_SCROLL_DISTANCE =
    PARALLAX_HEADER_MAX_HEIGHT - PARALLAX_HEADER_MIN_HEIGHT;

  return {
    PARALLAX_HEADER_SCROLL_DISTANCE,
  };
}
