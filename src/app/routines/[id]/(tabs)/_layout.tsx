import Box from "@/components/Box";
import CustomTabNavigator from "@/components/CustomTabNavigator";
import { Theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { Link, router, useLocalSearchParams, useNavigation } from "expo-router";
import { useContext, useEffect, useRef } from "react";
import { Animated, Pressable, ScrollView } from "react-native";

import RoutineDetailsAboutTab from "./about";
import RoutineDetailsWorkoutsTab from "./workouts";
import Button from "@/components/Button";
import { ScrollingContext } from "@/contexts/scrolling";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Header,
  getHeaderTitle,
  HeaderBackground,
  HeaderBackButton,
} from "@react-navigation/elements";
import { Image } from "expo-image";
import blurhash from "@/constants/blurhash";
import Text from "@/components/Text";
import useParallaxHeaderScrollDistance from "@/hooks/useParallaxHeaderScrollDistance";
import PARALLAX_HEADER_MAX_HEIGHT from "@/constants/parallaxHeaderMaxHeight";
import { setStatusBarStyle } from "expo-status-bar";
import { ThemeContext } from "@/providers/theme";

const AnimatedExpoImage = Animated.createAnimatedComponent(Image);

export default function RoutineDetails() {
  const { name } = useLocalSearchParams();

  const { colors } = useTheme<Theme>();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const { PARALLAX_HEADER_SCROLL_DISTANCE } = useParallaxHeaderScrollDistance();

  const scrollY = useRef(new Animated.Value(0)).current;

  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    if (!darkMode) {
      setStatusBarStyle("light");

      const updateStatusBar = scrollY.addListener(({ value }) => {
        setStatusBarStyle(
          value > PARALLAX_HEADER_SCROLL_DISTANCE / 2 ? "dark" : "light"
        );
      });

      return () => {
        setStatusBarStyle("dark");

        scrollY.removeListener(updateStatusBar);
      };
    }
  }, [darkMode]);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, PARALLAX_HEADER_SCROLL_DISTANCE],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const titleOpacity = scrollY.interpolate({
    inputRange: [0, PARALLAX_HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, PARALLAX_HEADER_SCROLL_DISTANCE],
    outputRange: [0, -PARALLAX_HEADER_SCROLL_DISTANCE],
    extrapolate: "clamp",
  });

  const defaultHeaderReverseTranslate = scrollY.interpolate({
    inputRange: [0, PARALLAX_HEADER_SCROLL_DISTANCE],
    outputRange: [0, PARALLAX_HEADER_SCROLL_DISTANCE],
    extrapolate: "clamp",
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [
      0,
      PARALLAX_HEADER_SCROLL_DISTANCE / 2,
      PARALLAX_HEADER_SCROLL_DISTANCE,
    ],
    outputRange: [1, 1, 0],
    extrapolate: "clamp",
  });

  const imageTranslate = scrollY.interpolate({
    inputRange: [0, PARALLAX_HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolateLeft: "clamp",
  });

  const imageScale = scrollY.interpolate({
    inputRange: [-200, 0],
    outputRange: [2, 1],
    extrapolate: "clamp",
  });

  const iconBackdropOpacity = scrollY.interpolate({
    inputRange: [0, PARALLAX_HEADER_SCROLL_DISTANCE],
    outputRange: [0.5, 0],
    extrapolate: "clamp",
  });

  const aboutScrollViewRef = useRef<ScrollView>(null);
  const workoutsScrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    navigation.setOptions({
      title: name,
      header: ({ options, route }: any) => (
        <Animated.View
          style={{
            height: PARALLAX_HEADER_MAX_HEIGHT,
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
              height: PARALLAX_HEADER_MAX_HEIGHT,
              transform: [
                { translateY: imageTranslate },
                { scale: imageScale },
              ],
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
              <>
                <Animated.View
                  style={{
                    backgroundColor: colors.surface,
                    opacity: iconBackdropOpacity,
                    borderRadius: 1000,
                    marginLeft: 8,
                    width: 36,
                    height: 36,
                    position: "absolute",
                  }}
                ></Animated.View>
                <Box
                  borderRadius="full"
                  alignItems="center"
                  justifyContent="center"
                  width={36}
                  height={36}
                  marginLeft="s"
                >
                  <HeaderBackButton
                    canGoBack={router.canGoBack()}
                    onPress={router.back}
                    labelVisible={false}
                    style={{ marginRight: -10 }}
                  />
                </Box>
              </>
            )}
            headerRight={() => (
              <Box flexDirection="row" gap="xs">
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
                      <Box opacity={pressed ? 0.5 : 1}>
                        <Animated.View
                          style={{
                            backgroundColor: colors.surface,
                            opacity: iconBackdropOpacity,
                            borderRadius: 1000,
                            marginLeft: 8,
                            width: 36,
                            height: 36,
                            position: "absolute",
                          }}
                        ></Animated.View>
                        <Box
                          borderRadius="full"
                          alignItems="center"
                          justifyContent="center"
                          width={36}
                          height={36}
                          marginLeft="s"
                        >
                          <Ionicons
                            name="pencil-sharp"
                            size={25}
                            color={colors.onSurfaceContainer}
                          />
                        </Box>
                      </Box>
                    )}
                  </Pressable>
                </Link>
                <Link href="/teste" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <Box opacity={pressed ? 0.5 : 1}>
                        <Animated.View
                          style={{
                            backgroundColor: colors.surface,
                            opacity: pressed ? 0.5 : iconBackdropOpacity,
                            borderRadius: 1000,
                            marginRight: 16,
                            width: 36,
                            height: 36,
                            position: "absolute",
                          }}
                        ></Animated.View>
                        <Box
                          borderRadius="full"
                          alignItems="center"
                          justifyContent="center"
                          width={36}
                          height={36}
                          marginRight="m"
                        >
                          <Ionicons
                            name="share-outline"
                            size={25}
                            color={colors.onSurfaceContainer}
                            style={{ marginRight: -3 }}
                          />
                        </Box>
                      </Box>
                    )}
                  </Pressable>
                </Link>
              </Box>
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
              // TODO: Looks weird on light theme, the position: absolute approach (to leverage opacity) doesn't work here
              // due to the title having a dynamic width
              // backgroundColor: colors.surface,
              opacity: titleOpacity,
              borderRadius: 32,
              padding: 4,
              paddingHorizontal: 8,
              position: "absolute",
              bottom: 16,
              left: 16,
            }}
          >
            <Text variant="headline" color="onSurface">
              {getHeaderTitle(options, route.name)}
            </Text>
          </Animated.View>
        </Animated.View>
      ),
    });
  }, [navigation, colors]);

  return (
    <>
      <ScrollingContext.Provider
        value={{
          scrollY,
          scrollViewRefs: [aboutScrollViewRef, workoutsScrollViewRef],
        }}
      >
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
