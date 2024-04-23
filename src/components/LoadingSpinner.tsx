import { Theme } from "@/constants/theme";
import { useTheme } from "@shopify/restyle";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import Box from "./Box";

export default function LoadingSpinner() {
  const rotationDegree = useRef(new Animated.Value(0)).current;

  const { colors } = useTheme<Theme>();

  const rotateZ = rotationDegree.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotationDegree, {
        toValue: 360,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  return (
    <Box justifyContent="center" alignItems="center" height={56} width={56}>
      <Box
        height="100%"
        width="100%"
        borderRadius="full"
        borderWidth={6}
        opacity={0.25}
        borderColor="tertiary"
      />
      <Animated.View
        style={{
          height: "100%",
          width: "100%",
          borderRadius: 1000,
          borderWidth: 6,
          borderTopColor: colors.tertiary,
          borderLeftColor: colors.transparent,
          borderRightColor: colors.transparent,
          borderBottomColor: colors.transparent,
          position: "absolute",
          transform: [
            {
              rotateZ,
            },
          ],
        }}
      />
    </Box>
  );
}
