import { Link, Navigator, Slot, useNavigation } from "expo-router";
import { View, Text } from "../../../components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, useColorScheme, StyleSheet, ViewStyle } from "react-native";
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
    <View style={{ flexDirection: "row" }}>
      <TabLink href="/home/following" name="following">
        {({ pressed, focused }) => (
          <View
            style={[
              styles.button,
              {
                opacity: pressed ? 0.5 : 1,
                backgroundColor: focused ? "#fff" : "#000",
                borderColor: focused ? "#000" : "#fff",
              },
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color: focused ? "#000" : "#fff",
                },
              ]}
            >
              Following
            </Text>
          </View>
        )}
      </TabLink>
      <TabLink href="/home/discover" name="discover">
        {({ pressed, focused }) => (
          <View
            style={[
              styles.button,
              {
                opacity: pressed ? 0.5 : 1,
                backgroundColor: focused ? "#fff" : "#000",
                borderColor: focused ? "#000" : "#fff",
              },
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color: focused ? "#000" : "#fff",
                },
              ]}
            >
              Discover
            </Text>
          </View>
        )}
      </TabLink>
    </View>
  );
}

function useIsTabSelected(name: string): boolean {
  const { state } = Navigator.useContext();
  console.log(state.routes);
  console.log(state.index)

  const current = state.routes.find((route, i) => state.index === i);
  return current.name === name;
}

function TabLink({
  children,
  name,
  href,
}: {
  children?: any;
  name: string;
  href: string;
}) {
  const focused = useIsTabSelected(name);
  return (
    <Link href={href} asChild>
      <Pressable>{(props) => children({ ...props, focused })}</Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    marginTop: 20,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 1,
  },
  buttonText: {
    color: "black",
  },
});
