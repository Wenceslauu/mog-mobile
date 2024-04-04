import { useTheme } from "@shopify/restyle";
import Box from "./Box";
import { Theme } from "@/constants/theme";

export default function UnseenBadge() {
  const { colors } = useTheme<Theme>();

  return (
    <Box
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.primary,
      }}
    />
  );
}
