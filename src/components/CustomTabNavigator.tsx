import { Pressable, useWindowDimensions, Animated } from "react-native";
import {
  MaterialTopTabBarProps,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import Text from "./Text";
import { Theme } from "@/constants/theme";
import { useTheme } from "@shopify/restyle";
import Box from "./Box";

const Tab = createMaterialTopTabNavigator();

type CustomTabNavigatorProps = {
  tabs: {
    name: string;
    component: any;
  }[];
  initialRouteName?: string;
  scrolling?: Animated.Value;
  collapsible?: boolean;
};

export default function CustomTabNavigator({
  tabs,
  initialRouteName,
  scrolling,
  collapsible,
}: CustomTabNavigatorProps) {
  const layout = useWindowDimensions();

  return (
    <Tab.Navigator
      tabBar={(props) => (
        <CustomTabBar
          {...props}
          scrolling={scrolling}
          collapsible={collapsible}
        />
      )}
      style={{ position: collapsible ? "relative" : undefined }}
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

const TABVIEW_HEADER_HEIGHT = 100;

type CustomTabBarProps = MaterialTopTabBarProps & {
  scrolling?: Animated.Value;
  collapsible?: boolean;
};

function CustomTabBar({
  state,
  scrolling,
  collapsible,
  ...props
}: CustomTabBarProps) {
  if (collapsible) {
    let headerTranslateY:
      | number
      | Animated.AnimatedInterpolation<string | number> = 0;

    if (scrolling) {
      headerTranslateY = scrolling.interpolate({
        inputRange: [0, TABVIEW_HEADER_HEIGHT],
        outputRange: [0, -TABVIEW_HEADER_HEIGHT],
        extrapolate: "clamp",
      });
    }

    return (
      <Animated.View
        style={{
          flexDirection: "row",
          gap: 8,
          padding: 16,
          transform: [{ translateY: headerTranslateY }],
          backgroundColor: "red",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
        }}
      >
        {state.routes.map((route, index) => {
          return (
            <CustomTabBarButton
              {...props}
              key={index}
              state={state}
              route={route}
              index={index}
            />
          );
        })}
      </Animated.View>
    );
  }

  return (
    <Box flexDirection="row" gap="s" padding="m">
      {state.routes.map((route, index) => {
        return (
          <CustomTabBarButton
            {...props}
            key={index}
            state={state}
            route={route}
            index={index}
          />
        );
      })}
    </Box>
  );
}

type CustomTabBarButtonProps = MaterialTopTabBarProps & {
  route: any;
  index: number;
};

function CustomTabBarButton({
  state,
  descriptors,
  navigation,
  position,
  route,
  index,
}: CustomTabBarButtonProps) {
  const { colors } = useTheme<Theme>();

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
            borderRadius: 15,
            opacity: pressed ? 0.5 : 1,
            backgroundColor,
          }}
        >
          <Text
            variant="body"
            textTransform="capitalize"
            color={focused ? "onSecondaryContainer" : "onSurfaceContainer"}
          >
            {route.name}
          </Text>
        </Animated.View>
      )}
    </Pressable>
  );
}
