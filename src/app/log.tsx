import theme from "@/constants/theme";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View, useColorScheme } from "react-native";

export default function ModalScreen() {
  const colorScheme = useColorScheme() ?? "light";

  const styles = createStyles(colorScheme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log</Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const createStyles = (colorScheme: "dark" | "light") => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors[colorScheme].surface.main,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.colors[colorScheme].surface.on,
    },
  });
};
