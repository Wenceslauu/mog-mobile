import { Link, useNavigation } from "expo-router";
import { Animated, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useEffect, useRef } from "react";
import CustomTabNavigator from "@/components/CustomTabNavigator";
import Box from "@/components/Box";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";

import DiscoverTab from "./discover";
import FollowingTab from "./following";

export default function HomeLayout() {
  const { colors } = useTheme<Theme>();
  const navigation = useNavigation();

  const scrolling = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Box flexDirection="row">
          <Link href="/activity" asChild>
            <Pressable>
              {({ pressed }) => (
                <Ionicons
                  name="notifications"
                  size={25}
                  color={colors.onSurfaceContainer}
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
                  color={colors.onSurfaceContainer}
                  style={[styles.icon, { opacity: pressed ? 0.5 : 1 }]}
                />
              )}
            </Pressable>
          </Link>
        </Box>
      ),
    });
  }, [navigation, colors]);

  return (
    <CustomTabNavigator
      tabs={[
        {
          name: "following",
          component: () => <FollowingTab scrolling={scrolling} />,
        },
        { name: "discover", component: DiscoverTab },
      ]}
      scrolling={scrolling}
      collapsible
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 15,
  },
});
