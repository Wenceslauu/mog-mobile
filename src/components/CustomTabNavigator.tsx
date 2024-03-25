import { Pressable, useWindowDimensions, Animated } from "react-native";
import {
  MaterialTopTabBarProps,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import Text from "./Text";
import { Theme } from "@/constants/theme";
import { useTheme } from "@shopify/restyle";
import Box from "./Box";
import TABVIEW_HEADER_HEIGHT from "@/constants/tabViewHeaderHeight";
import useParallaxHeaderScrollDistance from "@/hooks/useParallaxHeaderScrollDistance";
import PARALLAX_HEADER_MAX_HEIGHT from "@/constants/parallaxHeaderMaxHeight";

const Tab = createMaterialTopTabNavigator();

type CustomTabNavigatorProps = {
  tabs: {
    name: string;
    component: any;
  }[];
  initialRouteName?: string;

  scrollY?: Animated.Value;

  collapsible?: boolean;

  parallax?: boolean;
};

export default function CustomTabNavigator({
  tabs,
  initialRouteName,
  scrollY,
  collapsible,
  parallax,
}: CustomTabNavigatorProps) {
  const layout = useWindowDimensions();

  return (
    <Tab.Navigator
      tabBar={(props) => (
        <CustomTabBar
          {...props}
          scrollY={scrollY}
          collapsible={collapsible}
          parallax={parallax}
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

type CustomTabBarProps = MaterialTopTabBarProps & {
  scrollY?: Animated.Value;
  collapsible?: boolean;
  parallax?: boolean;
};

function CustomTabBar({
  state,
  scrollY,
  collapsible,
  parallax,
  ...props
}: CustomTabBarProps) {
  const { PARALLAX_HEADER_SCROLL_DISTANCE } = useParallaxHeaderScrollDistance();

  if (collapsible) {
    let headerTranslate:
      | Animated.AnimatedDiffClamp<string | number>
      | number = 0;

    if (scrollY) {
      // Prevent issues with the bounce effect on iOS
      const clampedScrollY = scrollY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: "clamp",
      });

      headerTranslate = Animated.diffClamp(
        clampedScrollY,
        0,
        TABVIEW_HEADER_HEIGHT
      ).interpolate({
        inputRange: [0, 1],
        outputRange: [0, -1],
      });
    }

    return (
      <Animated.View
        style={{
          flexDirection: "row",
          gap: 8,
          padding: 16,
          transform: [{ translateY: headerTranslate }],
          // backgroundColor: "red",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          elevation: 1,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
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

  if (parallax) {
    let headerTranslate:
      | Animated.AnimatedDiffClamp<string | number>
      | number = 0;

    if (scrollY) {
      headerTranslate = scrollY.interpolate({
        inputRange: [0, PARALLAX_HEADER_SCROLL_DISTANCE],
        outputRange: [0, -PARALLAX_HEADER_SCROLL_DISTANCE],
        extrapolateLeft: "clamp",
      });
    }

    return (
      <Animated.View
        style={{
          flexDirection: "row",
          gap: 8,
          padding: 16,
          transform: [{ translateY: headerTranslate }],
          position: "absolute",
          top: PARALLAX_HEADER_MAX_HEIGHT,
          left: 0,
          right: 0,
          zIndex: 1,
          elevation: 1,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
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
