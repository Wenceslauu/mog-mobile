import {
  Pressable,
  StyleSheet,
  useColorScheme,
  Text,
  View,
} from "react-native";

import { useEffect } from "react";
import { Link, useNavigation } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "@/constants/theme";

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const navigation = useNavigation();

  const styles = createStyles(colorScheme);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Link href="/settings" asChild>
          <Pressable>
            {({ pressed }) => (
              <Ionicons
                name="settings-outline"
                size={25}
                color={theme.colors[colorScheme].surface.onContainer}
                style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </Link>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <Link href="/edit-profile" asChild>
            <Pressable>
              {({ pressed }) => (
                <MaterialCommunityIcons
                  name="account-edit-outline"
                  size={29}
                  color={theme.colors[colorScheme].surface.onContainer}
                  style={{ marginRight: 11, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
          <Link href="/share-profile" asChild>
            <Pressable>
              {({ pressed }) => (
                <Ionicons
                  name="share-social"
                  size={25}
                  color={theme.colors[colorScheme].surface.onContainer}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
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
