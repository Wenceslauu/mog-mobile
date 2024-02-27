import { Ionicons } from "@expo/vector-icons";

import { Tabs } from "expo-router";

import { Theme } from "@/constants/theme";
import { useTheme } from "@shopify/restyle";
import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
export default function TabsLayout() {
  const { colors } = useTheme<Theme>();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.onSurfaceContainer,
      }}
      screenListeners={() => ({
        tabPress: () => {
          if (Platform.OS === "ios") Haptics.selectionAsync();
        },
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={`home${focused ? "" : "-outline"}`}
              size={28}
              style={{ marginBottom: -3 }}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="routines"
        options={{
          title: "Routines",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={`calendar${focused ? "" : "-outline"}`}
              size={28}
              style={{ marginBottom: -3 }}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="logPlaceholder"
        options={{
          title: "Log",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="add-circle-outline"
              size={32}
              style={{ marginBottom: -3 }}
              color={color}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("log");
          },
        })}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: "Exercises",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={`barbell${focused ? "" : "-outline"}`}
              size={28}
              style={{ marginBottom: -3 }}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={`person${focused ? "" : "-outline"}`}
              size={28}
              style={{ marginBottom: -3 }}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
