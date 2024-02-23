import { Pressable } from "react-native";

import Box from "./Box";
import Text from "./Text";

type ButtonProps = {
  children: string;
  variant: "primary" | "secondary";
};

export default function Button({ children, variant }: ButtonProps) {
  return (
    <Pressable>
      {({ pressed }) => (
        <Box
          justifyContent="center"
          alignItems="center"
          backgroundColor={variant === "primary" ? "primary" : "transparent"}
          padding="m"
          borderRadius="l"
          opacity={pressed ? 0.5 : 1}
          borderWidth={1}
          borderColor={variant === "secondary" ? "outline" : "transparent"}
        >
          <Text
            variant="body"
            color={variant === "primary" ? "onPrimary" : "onSurface"}
          >
            {children}
          </Text>
        </Box>
      )}
    </Pressable>
  );
}
