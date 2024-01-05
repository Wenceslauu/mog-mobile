import { Pressable, StyleSheet, useColorScheme } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation, Link } from "expo-router";
import { useEffect, useState } from "react";
import theme from "@/constants/theme";
import LocalSearchBar from "@/components/LocalSearchBar";
import DismissKeyboardView from "@/components/DismissKeyboardView";

export default function RoutinesScreen() {
  const [searchText, setSearchText] = useState("");

  const colorScheme = useColorScheme() ?? "light";
  const navigation = useNavigation();

  const styles = createStyles(colorScheme);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Link href="/create-routine" asChild>
          <Pressable>
            {({ pressed }) => (
              <Ionicons
                name="add-circle-outline"
                size={29}
                color={theme.colors[colorScheme].surface.onContainer}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </Link>
      ),
    });
  }, [navigation]);

  return (
    <DismissKeyboardView style={styles.container}>
      <LocalSearchBar text={searchText} setText={setSearchText} />
    </DismissKeyboardView>
  );
}

const createStyles = (colorScheme: "dark" | "light") => {
  const surface = theme.colors[colorScheme].surface.main;
  const onSurface = theme.colors[colorScheme].surface.on;

  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: surface,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: onSurface,
    },
  });
};
