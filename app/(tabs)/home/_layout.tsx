import { Link, useNavigation } from "expo-router";
import { View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import { useEffect } from "react";
import CustomTabNavigator from "@/components/CustomTabNavigator";

export default function HomeLayout() {
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
    <CustomTabNavigator
      tabs={[
        { name: "following", href: "/home/following" },
        { name: "discover", href: "/home/discover" },
      ]}
    />
  );
}
