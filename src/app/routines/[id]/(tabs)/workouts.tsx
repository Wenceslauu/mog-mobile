import Box from "@/components/Box";
import Text from "@/components/Text";
import { Theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { useContext, useEffect, useState } from "react";
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { TabView } from "react-native-tab-view";
import CycleTab from "@/components/routineDetails/CycleTab";
import TABVIEW_HEADER_HEIGHT from "@/constants/tabViewHeaderHeight";
import { ScrollingContext } from "@/contexts/scrolling";
import PARALLAX_HEADER_MAX_HEIGHT from "@/constants/parallaxHeaderMaxHeight";
import { createRandomRoutineCyclePreview } from "@/helpers/mocks/Routine";
import { faker } from "@faker-js/faker";

const mockedCycles = Array.from(
  {
    length: faker.number.int({ min: 1, max: 4 }),
  },
  createRandomRoutineCyclePreview
);

export default function RoutineDetailsWorkoutsTab() {
  const { colors } = useTheme<Theme>();
  const layout = useWindowDimensions();
  const { scrollY, scrollViewRefs } = useContext(ScrollingContext);

  const aboutScrollViewRef = scrollViewRefs![0];
  const workoutsScrollViewRef = scrollViewRefs![1];

  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState<{ key: string; title: string }[]>([]);

  useEffect(() => {
    const cycleRoutes = mockedCycles.map((cycle, index) => {
      return { key: index.toString(), title: cycle.name };
    });

    setRoutes(cycleRoutes);
  }, []);

  const keepScrollViewsInSync = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    aboutScrollViewRef.current?.scrollTo({
      y: event.nativeEvent.contentOffset.y,
      animated: false,
    });
  };

  return (
    <Animated.ScrollView
      ref={workoutsScrollViewRef}
      contentContainerStyle={{
        paddingBottom: 40,
        marginTop: TABVIEW_HEADER_HEIGHT - 16, // 16 is approximately the bounce distance
        paddingTop: PARALLAX_HEADER_MAX_HEIGHT + 16,
        minHeight: 1000,
      }}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                y: scrollY,
              },
            },
          },
        ],
        { useNativeDriver: true }
      )}
      onScrollEndDrag={keepScrollViewsInSync}
      onMomentumScrollEnd={keepScrollViewsInSync}
    >
      <TabView
        renderTabBar={({ navigationState, jumpTo }) => {
          const inputRange = navigationState.routes.map((x, i) => i);

          return (
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              paddingBottom="m"
              backgroundColor="surface"
              paddingHorizontal="m"
            >
              <Box>
                <Text variant="title" color="onSurface">
                  {mockedCycles[navigationState.index].name}
                </Text>
                <Text variant="body" color="onSurface">
                  {mockedCycles[navigationState.index].duration} weeks
                </Text>
              </Box>
              <Box flexDirection="row" alignItems="center" gap="xs">
                <Pressable
                  onPress={() => jumpTo((navigationState.index - 1).toString())}
                  disabled={navigationState.index === 0}
                  style={{
                    opacity: navigationState.index === 0 ? 0.5 : 1,
                  }}
                >
                  {({ pressed }) => (
                    <Ionicons
                      name="chevron-back"
                      size={27}
                      color={colors.onSurfaceContainer}
                      style={{ opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
                <Text variant="body" color="onSurface">
                  {navigationState.index + 1} / {mockedCycles.length} cycles
                </Text>
                <Pressable
                  onPress={() => jumpTo((navigationState.index + 1).toString())}
                  disabled={
                    navigationState.index === navigationState.routes.length - 1
                  }
                  style={{
                    opacity:
                      navigationState.index ===
                      navigationState.routes.length - 1
                        ? 0.5
                        : 1,
                  }}
                >
                  {({ pressed }) => (
                    <Ionicons
                      name="chevron-forward"
                      size={27}
                      color={colors.onSurfaceContainer}
                      style={{ opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Box>
            </Box>
          );
        }}
        navigationState={{ index, routes }}
        // TODO: Try to optimize with shouldComponentUpdate?
        renderScene={({ route }) => {
          return (
            <CycleTab workouts={mockedCycles[Number(route.key)].workouts} />
          );
        }}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={{ height: 550 }} // Approximately the remaining screen height
      />
    </Animated.ScrollView>
  );
}
