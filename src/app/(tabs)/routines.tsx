import { Pressable, StyleSheet, useColorScheme } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation, Link } from "expo-router";
import { useEffect } from "react";
import theme from "@/constants/theme";
import LocalSearchBar from "@/components/LocalSearchBar";
import DismissKeyboardView from "@/components/DismissKeyboardView";

export default function RoutinesScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Link href="/create-routine" asChild>
          <Pressable>
            {({ pressed }) => (
              <Ionicons
                name="add-circle-outline"
                size={29}
                color={theme.colors[colorScheme].surface.onSurfaceContainer}
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
      <LocalSearchBar />
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
