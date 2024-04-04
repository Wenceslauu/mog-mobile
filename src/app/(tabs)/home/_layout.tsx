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
import { ScrollingContext } from "@/contexts/scrolling";
import { useUnseenActivity } from "@/providers/unseenActivity";

export default function HomeLayout() {
  const { colors } = useTheme<Theme>();
  const navigation = useNavigation();

  // There's no need to update the ref value, pass the ref.current
  const scrollY = useRef(new Animated.Value(0)).current;

  const { hasUnseenActivity } = useUnseenActivity();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Box flexDirection="row">
          <Link href="/activity" asChild>
            <Pressable>
              {({ pressed }) => (
                <Box marginRight="m" opacity={pressed ? 0.5 : 1}>
                  <Ionicons
                    name="notifications"
                    size={25}
                    color={colors.onSurfaceContainer}
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  />
                  {hasUnseenActivity && (
                    <Box
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: colors.error,
                      }}
                    />
                  )}
                </Box>
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
    <ScrollingContext.Provider value={{ scrollY }}>
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
    </ScrollingContext.Provider>
  );
}
