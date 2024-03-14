import { Pressable } from "react-native";

import Box from "./Box";
import Text from "./Text";
import { ReactNode } from "react";

type ButtonProps = {
  children?: ReactNode;
  variant: "primary" | "secondary" | "tertiary";
  onPress?: () => void;
};

export default function Button({ children, variant, onPress }: ButtonProps) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <Box
          justifyContent="center"
          alignItems="center"
          backgroundColor={variant === "primary" ? "primary" : "transparent"}
          padding="m"
          borderRadius="l"
          opacity={pressed ? 0.5 : 1}
          borderWidth={1}
          borderColor={variant === "secondary" ? "primary" : "transparent"}
        >
          <Text
            variant="body"
            color={variant === "primary" ? "onPrimary" : "primary"}
          >
            {children}
          </Text>
        </Box>
      )}
    </Pressable>
  );
}
