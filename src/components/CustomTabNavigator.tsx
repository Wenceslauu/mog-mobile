import { Link, Navigator, Slot } from "expo-router";
import { PressableStateCallbackType } from "react-native";
import { Pressable } from "react-native";
import { TabRouter } from "@react-navigation/native";
import Box from "./Box";
import Text from "./Text";

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
  return (
    <Box flexDirection="row" gap="s" marginLeft="m">
      {tabs.map((tab, index) => {
        return (
          <TabLink href={tab.href} name={tab.name} key={index}>
            {({ pressed, focused }: CustomPressableCallbackProps) => (
              <Box
                padding="m"
                marginTop="m"
                borderRadius={15}
                borderWidth={1}
                borderColor="onSurface"
                opacity={pressed ? 0.5 : 1}
                backgroundColor={focused ? "onSurface" : "surface"}
              >
                <Text
                  variant="body"
                  textTransform="capitalize"
                  color={focused ? "surface" : "onSurface"}
                >
                  {tab.name}
                </Text>
              </Box>
            )}
          </TabLink>
        );
      })}
    </Box>
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
      <Pressable disabled={focused}>
        {(props) => children({ ...props, focused })}
      </Pressable>
    </Link>
  );
}
