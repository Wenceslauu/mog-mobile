import { Pressable, useWindowDimensions } from "react-native";
import {
  MaterialTopTabBarProps,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import Box from "./Box";
import Text from "./Text";

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

// TODO: Add swiping animation to tab bar buttons based on position
function CustomTabBar({
  state,
  descriptors,
  navigation,
  position,
}: MaterialTopTabBarProps) {
  return (
    <Box flexDirection="row" gap="s" marginLeft="m">
      {state.routes.map((route, index) => {
        const focused = state.index === index;

        return (
          <Pressable
            disabled={focused}
            onPress={() => navigation.navigate(route.name, route.params)}
          >
            {({ pressed }) => (
              <Box
                padding="m"
                marginTop="m"
                borderRadius={15}
                opacity={pressed ? 0.5 : 1}
                backgroundColor={focused ? "secondaryContainer" : "surfaceContainer"}
              >
                <Text
                  variant="body"
                  textTransform="capitalize"
                  color={focused ? "onSecondaryContainer" : "onSurfaceContainer"}
                >
                  {route.name}
                </Text>
              </Box>
            )}
          </Pressable>
        );
      })}
    </Box>
  );
}
