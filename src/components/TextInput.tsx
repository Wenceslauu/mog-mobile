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
  TypographyProps,
  typography,
  VariantProps,
  createVariant,
  border,
  BorderProps,
} from "@shopify/restyle";
import { ComponentPropsWithRef, forwardRef } from "react";
import { TextInput as RNTextInput } from "react-native";

type RestyleProps = LayoutProps<Theme> &
  SpacingProps<Theme> &
  BorderProps<Theme> &
  ColorProps<Theme> &
  BackgroundColorProps<Theme> &
  TypographyProps<Theme> &
  VariantProps<Theme, "textVariants">;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  layout,
  spacing,
  border,
  color,
  backgroundColor,
  typography,
  createVariant({ themeKey: "textVariants" }),
]);

type TextInputProps = RestyleProps & ComponentPropsWithRef<typeof RNTextInput>;

export default forwardRef(function TextInput(rest: TextInputProps, ref: any) {
  const props = useRestyle(restyleFunctions, rest);

  return <RNTextInput ref={ref} {...props} />;
});
