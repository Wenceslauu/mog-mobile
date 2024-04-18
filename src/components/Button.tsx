import { Pressable } from "react-native";

import Box from "./Box";
import Text from "./Text";
import { ReactNode } from "react";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";

type ButtonProps = {
  children?: ReactNode;
  icon?: (color: string, size: number) => ReactNode;
  variant: "primary" | "secondary" | "tertiary";
  size: "s" | "m" | "l";
  onPress?: () => void;
};

export default function Button({
  children,
  icon,
  variant,
  size = "m",
  onPress,
}: ButtonProps) {
  const { colors } = useTheme<Theme>();

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <Box
          flexDirection="row"
          gap="xs"
          justifyContent="center"
          alignItems="center"
          backgroundColor={variant === "primary" ? "primary" : "transparent"}
          padding="m"
          paddingVertical={size === "s" ? "s" : "m"}
          borderRadius="l"
          opacity={pressed ? 0.5 : 1}
          borderWidth={1}
          borderColor={variant === "secondary" ? "primary" : "transparent"}
        >
          {icon &&
            icon(variant === "primary" ? colors.onPrimary : colors.primary, 24)}
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
