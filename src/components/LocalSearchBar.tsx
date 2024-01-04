import theme from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Dispatch, SetStateAction, useState } from "react";
import { View, TextInput, StyleSheet, useColorScheme } from "react-native";

type LocalSearchBarProps = {
  value: string;
  onChangeText: Dispatch<SetStateAction<string>>;
};

export default function LocalSearchBar({
  value,
  onChangeText,
}: LocalSearchBarProps) {
  const colorScheme = useColorScheme() ?? "light";

  const styles = createStyles(colorScheme);

  return (
    <View style={styles.inputContainer}>
      <Ionicons
        name="search-outline"
        size={25}
        color={theme.colors[colorScheme].surface.on}
        style={styles.inputIcon}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
}

const createStyles = (colorScheme: "dark" | "light") => {
  return StyleSheet.create({
    inputContainer: {
      flexDirection: "row",
      borderRadius: 10,
      width: "80%",
    },
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
      color: theme.colors[colorScheme].surface.on,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors[colorScheme].surface.on,
    },
  });
};
