import { Link, Navigator, Slot } from "expo-router";
import {
  View,
  Text,
  useColorScheme,
  PressableStateCallbackType,
} from "react-native";
import { Pressable, StyleSheet } from "react-native";
import { TabRouter } from "@react-navigation/native";
import theme from "@/constants/theme";

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

interface CustomPressableCallbackProps extends PressableStateCallbackType {
  focused: boolean;
}

type CustomTabBarProps = {
  tabs: {
    name: string;
    href: string;
  }[];
};

function CustomTabBar({ tabs }: CustomTabBarProps) {
  const colorScheme = useColorScheme() ?? "light";

  const styles = createStyles(colorScheme);

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        return (
          <TabLink href={tab.href} name={tab.name} key={index}>
            {({ pressed, focused }: CustomPressableCallbackProps) => (
              <View
                style={[
                  styles.button,
                  {
                    opacity: pressed ? 0.5 : 1,
                    backgroundColor: focused
                      ? theme.colors[colorScheme].surface.on
                      : theme.colors[colorScheme].surface.main,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color: focused
                        ? theme.colors[colorScheme].surface.main
                        : theme.colors[colorScheme].surface.on,
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

const createStyles = (colorScheme: "dark" | "light") => {
  const onSurface = theme.colors[colorScheme].surface.on;

  return StyleSheet.create({
    container: {
      flexDirection: "row",
      gap: 10,
      marginLeft: 15,
    },
    button: {
      padding: 15,
      marginTop: 15,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: onSurface,
    },
    buttonText: {
      textTransform: "capitalize",
    },
  });
};

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
      <Pressable disabled={focused}>
        {(props) => children({ ...props, focused })}
      </Pressable>
    </Link>
  );
}
