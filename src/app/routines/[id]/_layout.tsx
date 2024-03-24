import Box from "@/components/Box";
import CustomTabNavigator from "@/components/CustomTabNavigator";
import { Theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Pressable } from "react-native";

import RoutineDetailsAboutTab from "./about";
import RoutineDetailsWorkoutsTab from "./workouts";
import Button from "@/components/Button";
import { ScrollingContext } from "@/contexts/scrolling";
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  Header,
  getHeaderTitle,
  getDefaultHeaderHeight,
  HeaderBackground,
  HeaderBackButton,
} from "@react-navigation/elements";
import { Image } from "expo-image";
import blurhash from "@/constants/blurhash";
import Text from "@/components/Text";

export const HEADER_MAX_HEIGHT = 200;

const AnimatedExpoImage = Animated.createAnimatedComponent(Image);

export default function RoutineDetails() {
  const { name } = useLocalSearchParams();

  const { colors } = useTheme<Theme>();
  const navigation = useNavigation();

  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();

  const HEADER_MIN_HEIGHT = getDefaultHeaderHeight(frame, false, insets.top);
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const titleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: "clamp",
  });

  const defaultHeaderReverseTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, HEADER_SCROLL_DISTANCE],
    extrapolate: "clamp",
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: "clamp",
  });

  const imageTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: "clamp",
  });

  useEffect(() => {
    navigation.setOptions({
      title: name,
      headerRight: () => (
        <Box flexDirection="row">
          <Link
            href={{
              pathname: "/create-routine/",
              params: {
                id: "teste",
              },
            }}
            asChild
          >
            <Pressable>
              {({ pressed }) => (
                <Ionicons
                  name="pencil-sharp"
                  size={25}
                  color={colors.onSurfaceContainer}
                  style={{ marginRight: 11, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
          <Link href="/teste" asChild>
            <Pressable>
              {({ pressed }) => (
                <Ionicons
                  name="share-outline"
                  size={25}
                  color={colors.onSurfaceContainer}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        </Box>
      ),
      header: ({ options, route }: any) => (
        <Animated.View
          style={{
            height: HEADER_MAX_HEIGHT,
            transform: [{ translateY: headerTranslate }],
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            overflow: "hidden",
          }}
        >
          <AnimatedExpoImage
            placeholder={blurhash}
            style={{
              height: HEADER_MAX_HEIGHT,
              transform: [{ translateY: imageTranslate }],
              opacity: imageOpacity,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
            }}
            source={
              "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          />
          <Header
            {...options}
            title={getHeaderTitle(options, route.name)}
            headerStyle={{
              transform: [{ translateY: defaultHeaderReverseTranslate }],
            }}
            headerLeft={() => (
              <HeaderBackButton
                labelVisible={false}
                style={{ marginLeft: 5 }}
              />
            )}
            headerTitleContainerStyle={{
              opacity: headerOpacity,
            }}
            headerBackground={() => (
              <HeaderBackground
                style={{
                  opacity: headerOpacity,
                  borderBottomColor: colors.outlineVariant,
                  borderBottomWidth: 1,
                }}
              />
            )}
            headerBackgroundContainerStyle={{
              position: "absolute",
            }}
            headerTransparent="true"
            headerStatusBarHeight={insets.top}
          />
          <Animated.View
            style={{
              opacity: titleOpacity,
              borderRadius: 10000,
              position: "absolute",
              bottom: 16,
              left: 16,
            }}
          >
            <Text variant="title" color="onSurface">
              {getHeaderTitle(options, route.name)}
            </Text>
          </Animated.View>
        </Animated.View>
      ),
    });
  }, [navigation, colors]);

  return (
    <>
      <ScrollingContext.Provider value={{ scrollY }}>
        <CustomTabNavigator
          tabs={[
            { name: "about", component: RoutineDetailsAboutTab },
            { name: "workouts", component: RoutineDetailsWorkoutsTab },
          ]}
          initialRouteName="about"
          scrollY={scrollY}
          parallax
        />
      </ScrollingContext.Provider>
      <Box
        backgroundColor="surfaceContainer"
        paddingHorizontal="m"
        paddingVertical="s"
        paddingBottom="l"
      >
        <Button variant="primary" onPress={() => console.log("start")}>
          Start Routine
        </Button>
      </Box>
    </>
  );
}
