import { Pressable, useWindowDimensions, Animated } from "react-native";
import {
  MaterialTopTabBarProps,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import Box from "./Box";
import Text from "./Text";
import { Theme } from "@/constants/theme";
import { useTheme } from "@shopify/restyle";

const Tab = createMaterialTopTabNavigator();

type CustomTabNavigatorProps = {
  tabs: {
    name: string;
    component: any;
  }[];
  initialRouteName?: string;
};

export default function CustomTabNavigator({
  tabs,
  initialRouteName,
}: CustomTabNavigatorProps) {
  const layout = useWindowDimensions();

  return (
    <Tab.Navigator
      tabBar={CustomTabBar}
      initialRouteName={initialRouteName}
      initialLayout={{ width: layout.width }}
    >
      {tabs.map((tab, index) => {
        return (
          <Tab.Screen name={tab.name} component={tab.component} key={index} />
        );
      })}
    </Tab.Navigator>
  );
}

function CustomTabBar({
  state,
  descriptors,
  navigation,
  position,
}: MaterialTopTabBarProps) {
  const { colors } = useTheme<Theme>();

  return (
    <Box flexDirection="row" gap="s" marginLeft="m">
      {state.routes.map((route, index) => {
        const focused = state.index === index;

        const inputRange = state.routes.map((_, i) => i);
        const backgroundColor = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) =>
            i === index ? colors.secondaryContainer : colors.surfaceContainer
          ),
        });

        return (
          <Pressable
            disabled={focused}
            onPress={() => navigation.navigate(route.name, route.params)}
          >
            {({ pressed }) => (
              <Animated.View
                style={{
                  padding: 16,
                  marginTop: 16,
                  borderRadius: 15,
                  opacity: pressed ? 0.5 : 1,
                  backgroundColor,
                }}
              >
                <Text
                  variant="body"
                  textTransform="capitalize"
                  color={
                    focused ? "onSecondaryContainer" : "onSurfaceContainer"
                  }
                >
                  {route.name}
                </Text>
              </Animated.View>
            )}
          </Pressable>
        );
      })}
    </Box>
  );
}
