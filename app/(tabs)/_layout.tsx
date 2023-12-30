import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import { View } from "../../components/Themed";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <Ionicons
                name="home"
                size={28}
                style={{ marginBottom: -3 }}
                color={color}
              />
            ) : (
              <Ionicons
                name="home-outline"
                size={28}
                style={{ marginBottom: -3 }}
                color={color}
              />
            ),
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
        }}
      />
      <Tabs.Screen
        name="routines"
        options={{
          title: "Routines",
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <Ionicons
                name="calendar"
                size={28}
                style={{ marginBottom: -3 }}
                color={color}
              />
            ) : (
              <Ionicons
                name="calendar-outline"
                size={28}
                style={{ marginBottom: -3 }}
                color={color}
              />
            ),
          headerRight: () => (
            <Link href="/create-routine" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="add-circle-outline"
                    size={29}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
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
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <Ionicons
                name="barbell"
                size={28}
                style={{ marginBottom: -3 }}
                color={color}
              />
            ) : (
              <Ionicons
                name="barbell-outline"
                size={28}
                style={{ marginBottom: -3 }}
                color={color}
              />
            ),
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
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <Ionicons
                name="person"
                size={28}
                style={{ marginBottom: -3 }}
                color={color}
              />
            ) : (
              <Ionicons
                name="person-outline"
                size={28}
                style={{ marginBottom: -3 }}
                color={color}
              />
            ),
          headerLeft: () => (
            <Link href="/settings" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="settings-outline"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerRight: ({ tintColor }) => (
            <View style={{ flexDirection: "row", backgroundColor: tintColor }}>
              <Link href="/edit-profile" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <MaterialCommunityIcons
                      name="account-edit-outline"
                      size={29}
                      color={Colors[colorScheme ?? "light"].text}
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
                      color={Colors[colorScheme ?? "light"].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
