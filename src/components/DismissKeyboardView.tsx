import { Keyboard, TouchableWithoutFeedback } from "react-native";
import Box from "./Box";
import { BoxProps } from "@shopify/restyle";
import { Theme } from "@/constants/theme";
import { ReactNode } from "react";

interface DismissKeyboardViewProps extends BoxProps<Theme> {
  children: ReactNode;
}

export default function DismissKeyboardView({
  children,
  ...props
}: DismissKeyboardViewProps) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Box {...props}>{children}</Box>
    </TouchableWithoutFeedback>
  );
}
