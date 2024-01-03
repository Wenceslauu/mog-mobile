import theme from "@/constants/theme";
import { StyleSheet, Text, View, useColorScheme } from "react-native";

export default function RequestsTab() {
  const colorScheme = useColorScheme() ?? "light";

  const styles = createStyles(colorScheme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Requests</Text>
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
