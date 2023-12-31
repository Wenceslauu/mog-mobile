import { Pressable, StyleSheet, useColorScheme } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, Link } from "expo-router";
import { useEffect } from "react";
import Colors from "../../constants/Colors";

export default function ExercisesScreen() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <View style={{ flexDirection: "row", backgroundColor: tintColor }}>
          <Link href="/create-exercise" asChild>
            <Pressable>
              {({ pressed }) => (
                <Ionicons
                  name="add-circle-outline"
                  size={29}
                  color={Colors[colorScheme ?? "light"].text}
                  style={{ marginRight: 8, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
          <Link href="/more" asChild>
            <Pressable>
              {({ pressed }) => (
                <MaterialCommunityIcons
                  name="dots-horizontal"
                  size={29}
                  color={Colors[colorScheme ?? "light"].text}
                  style={{
                    marginRight: 15,
                    marginTop: 1,
                    opacity: pressed ? 0.5 : 1,
                  }}
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
      <Text style={styles.title}>Exercises</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
    </View>
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
