import { Theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Dispatch, SetStateAction } from "react";
import { TextInput, StyleSheet } from "react-native";
import Box from "./Box";
import { useTheme } from "@shopify/restyle";

type LocalSearchBarProps = {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
};

export default function LocalSearchBar({ text, setText }: LocalSearchBarProps) {
  const { colors } = useTheme<Theme>();

  const styles = createStyles(colors);

  return (
    <Box flexDirection="row" borderRadius={10}>
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
