import { Link, Navigator, Slot } from "expo-router";
import { View, Text } from "./Themed";
import { Pressable, StyleSheet } from "react-native";
import { TabRouter } from "@react-navigation/native";

type CustomTabNavigatorProps = {
  tabs: {
    name: string;
    href: string;
  }[];
  initialRouteName?: string;
};

export default function CustomTabNavigator({
  tabs,
  initialRouteName,
}: CustomTabNavigatorProps) {
  return (
    <Navigator router={TabRouter} initialRouteName={initialRouteName}>
      <CustomTabBar tabs={tabs} />
      <Slot />
    </Navigator>
  );
}

type CustomTabBarProps = {
  tabs: {
    name: string;
    href: string;
  }[];
};

function CustomTabBar({ tabs }: CustomTabBarProps) {
  return (
    <View style={{ flexDirection: "row", gap: 10, marginLeft: 10 }}>
      {tabs.map((tab, index) => {
        return (
          <TabLink href={tab.href} name={tab.name} key={index}>
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
                  {tab.name}
                </Text>
              </View>
            )}
          </TabLink>
        );
      })}
    </View>
  );
}

function useIsTabSelected(name: string): boolean {
  const { state } = Navigator.useContext();
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
    marginTop: 15,
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 1,
  },
  buttonText: {
    color: "black",
    textTransform: "capitalize",
  },
});
