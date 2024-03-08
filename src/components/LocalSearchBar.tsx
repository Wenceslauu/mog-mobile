import { Theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Dispatch, SetStateAction } from "react";
import TextInput from "./TextInput";
import Box from "./Box";
import { BoxProps, useTheme } from "@shopify/restyle";

interface LocalSearchBarProps extends BoxProps<Theme> {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
}

export default function LocalSearchBar({
  text,
  setText,
  ...props
}: LocalSearchBarProps) {
  const { colors } = useTheme<Theme>();

  return (
    <Box
      flexDirection="row"
      borderRadius="s"
      {...props}
      backgroundColor="surfaceContainer"
    >
      <Ionicons
        name="search-outline"
        size={25}
        color={colors.onSurface}
        style={{
          position: "absolute",
          top: 10,
          left: 10,
        }}
      />
      <TextInput
        value={text}
        onChangeText={setText}
        selectionColor={colors.primary}
        flex={1}
        height={50}
        color="onSurface"
        padding="s"
        paddingLeft="xl"
      />
    </Box>
  );
}
