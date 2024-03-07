import { Link, useNavigation } from "expo-router";
import { Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useEffect, useRef } from "react";
import CustomTabNavigator from "@/components/CustomTabNavigator";
import Box from "@/components/Box";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";

import DiscoverTab from "./discover";
import FollowingTab from "./following";
import { HomeContext } from "@/contexts/navigators";

export default function HomeLayout() {
  const { colors } = useTheme<Theme>();
  const navigation = useNavigation();

  // There's no need to update the ref value, pass the ref.current
  const scrollY = useRef(new Animated.Value(0)).current;

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
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        </Box>
      ),
    });
  }, [navigation, colors]);

  return (
    <HomeContext.Provider value={{ scrollY }}>
      <CustomTabNavigator
        tabs={[
          {
            name: "following",
            component: FollowingTab,
          },
          { name: "discover", component: DiscoverTab },
        ]}
        scrollY={scrollY}
        collapsible
      />
    </HomeContext.Provider>
  );
}