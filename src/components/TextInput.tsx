import { Theme } from "@/constants/theme";
import {
  spacing,
  color,
  backgroundColor,
  SpacingProps,
  ColorProps,
  BackgroundColorProps,
  LayoutProps,
  composeRestyleFunctions,
  useRestyle,
  layout,
} from "@shopify/restyle";
import { ComponentPropsWithoutRef } from "react";
import { TextInput as RNTextInput } from "react-native";

type RestyleProps = LayoutProps<Theme> &
  SpacingProps<Theme> &
  ColorProps<Theme> &
  BackgroundColorProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  layout,
  spacing,
  color,
  backgroundColor,
]);

type TextInputProps = RestyleProps &
  ComponentPropsWithoutRef<typeof RNTextInput>;

const TextInput = (rest: TextInputProps) => {
  const props = useRestyle(restyleFunctions, rest);

  return <RNTextInput {...props} />;
};

export default TextInput;
