import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import theme from "@/constants/theme";

export default function NotFoundScreen() {
  const colorScheme = useColorScheme() ?? "light";

  const styles = createStyles(colorScheme);

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn't exist.</Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const createStyles = (colorScheme: "dark" | "light") => {
  const surface = theme.colors[colorScheme].surface.main;
  const onSurface = theme.colors[colorScheme].surface.on;
  const tertiary = theme.colors[colorScheme].tertiary.main;

  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      backgroundColor: surface,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: onSurface,
    },
    link: {
      marginTop: 15,
      paddingVertical: 15,
    },
    linkText: {
      fontSize: 14,
      color: tertiary,
    },
  });
};
