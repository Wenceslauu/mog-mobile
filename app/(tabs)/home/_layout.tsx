import { Link, Navigator, Slot, useNavigation } from "expo-router";
import { View } from "../../../components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, useColorScheme } from "react-native";
import Colors from "../../../constants/Colors";
import { useEffect } from "react";

export default function HomeLayout() {
  return (
    <Navigator>
      <CustomTabBar />
      <Slot />
    </Navigator>
  );
}

function CustomTabBar() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <View style={{ flexDirection: "row", backgroundColor: tintColor }}>
          <Link href="/activity" asChild>
            <Pressable>
              {({ pressed }) => (
                <Ionicons
                  name="notifications"
                  size={25}
                  color={Colors[colorScheme ?? "light"].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
          <Link href="/search" asChild>
            <Pressable>
              {({ pressed }) => (
                <Ionicons
                  name="search"
                  size={25}
                  color={Colors[colorScheme ?? "light"].text}
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
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      <Link href="/home/following" asChild>
        <Pressable>
          {({ pressed }) => (
            <Ionicons
              name="people"
              size={25}
              color={Colors[colorScheme ?? "light"].text}
              style={{ opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      </Link>
      <Link href="/home/discover" asChild>
        <Pressable>
          {({ pressed }) => (
            <Ionicons
              name="search"
              size={25}
              color={Colors[colorScheme ?? "light"].text}
              style={{ opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      </Link>
    </View>
  );
}
