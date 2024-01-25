import { Theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Dispatch, SetStateAction } from "react";
import { TextInput, StyleSheet } from "react-native";
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

  const styles = createStyles(colors);

  return (
    <Box flexDirection="row" borderRadius={10} {...props}>
      <Ionicons
        name="search-outline"
        size={25}
        color={colors.onSurface}
        style={styles.inputIcon}
      />
      <TextInput
        value={text}
        onChangeText={setText}
        selectionColor={colors.primary}
        style={styles.input}
      />
    </Box>
  );
}

const createStyles = (colors: Theme["colors"]) => {
  return StyleSheet.create({
    inputIcon: {
      position: "absolute",
      top: 10,
      left: 10,
    },
    input: {
      flex: 1,
      height: 50,
      padding: 10,
      paddingLeft: 40,
      color: colors.onSurface,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.onSurface,
    },
  });
};
