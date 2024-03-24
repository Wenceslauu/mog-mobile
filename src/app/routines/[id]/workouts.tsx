import Box from "@/components/Box";
import Text from "@/components/Text";
import { Theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { useContext, useEffect, useState } from "react";
import { Animated, Pressable, useWindowDimensions } from "react-native";
import { TabView } from "react-native-tab-view";
import CycleTab from "@/components/routines/CycleTab";
import { HEADER_MAX_HEIGHT } from "./_layout";
import TABVIEW_HEADER_HEIGHT from "@/constants/tabViewHeaderHeight";
import { ScrollingContext } from "@/contexts/scrolling";

const mockedCycles = [
  {
    name: "Volumizing",
    weeks: 3,
    workouts: [
      {
        name: "Upper 1",
        exercises: [
          {
            name: "Bench Press",
            id: 19,
            exerciseId: 196,
            // image: require("../../../assets/images/bench-press.jpg"),
            sets: [
              { number: 1, reps: 15, intensity: "40%" },
              {
                number: 2,
                reps: 12,
                intensity: "RPE 9",
              },
              {
                number: 1,
                reps: 10,
                intensity: "RPE 10",
              },
            ],
          },
          {
            name: "Incline Bench Press",
            exerciseId: 197,
            sets: [
              { number: 1, reps: 15, intensity: "40%" },
              {
                number: 2,
                reps: 12,
                intensity: "RPE 9",
              },
              {
                number: 1,
                reps: 10,
                intensity: "RPE 10",
              },
            ],
          },
        ],
      },
      {
        name: "Lower 1",
        exercises: [
          {
            name: "Squat",
            exerciseId: 198,
            sets: [
              { number: 1, reps: 15, intensity: "40%" },
              {
                number: 2,
                reps: 12,
                intensity: "RPE 9",
              },
              {
                number: 1,
                reps: 10,
                intensity: "RPE 10",
              },
            ],
          },
          {
            name: "Deadlift",
            exerciseId: 199,
            sets: [
              { number: 1, reps: 15, intensity: "40%" },
              {
                number: 2,
                reps: 12,
                intensity: "RPE 9",
              },
              {
                number: 1,
                reps: 10,
                intensity: "RPE 10",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Peak Week",
    weeks: 1,
    workouts: [
      {
        name: " Super Upper 1",
        exercises: [
          {
            name: "DB Bench Press",
            exerciseId: 200,
            sets: [
              { number: 1, reps: 12, intensity: "40%" },
              {
                number: 3,
                reps: 10,
                intensity: "RPE 9",
              },
              {
                number: 1,
                reps: 8,
                intensity: "RPE 10",
              },
            ],
          },
          {
            name: "Machine Bench Press",
            exerciseId: 201,
            sets: [
              { number: 1, reps: 12, intensity: "40%" },
              {
                number: 3,
                reps: 10,
                intensity: "RPE 9",
              },
              {
                number: 1,
                reps: 8,
                intensity: "RPE 10",
              },
            ],
          },
        ],
      },
      {
        name: "Super Lower 1",
        exercises: [
          {
            name: "Hack Squat",
            exerciseId: 202,
            sets: [
              { number: 1, reps: 12, intensity: "40%" },
              {
                number: 3,
                reps: 10,
                intensity: "RPE 9",
              },
              {
                number: 1,
                reps: 8,
                intensity: "RPE 10",
              },
            ],
          },
          {
            name: "RDL",
            exerciseId: 203,
            sets: [
              { number: 1, reps: 12, intensity: "40%" },
              {
                number: 3,
                reps: 10,
                intensity: "RPE 9",
              },
              {
                number: 1,
                reps: 8,
                intensity: "RPE 10",
              },
            ],
          },
        ],
      },
    ],
  },
];

export default function RoutineDetailsWorkoutsTab() {
  const { colors } = useTheme<Theme>();
  const layout = useWindowDimensions();
  const { scrollY } = useContext(ScrollingContext);

  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState<{ key: string; title: string }[]>([]);

  useEffect(() => {
    const cycleRoutes = mockedCycles.map((cycle, index) => {
      return { key: index.toString(), title: cycle.name };
    });

    setRoutes(cycleRoutes);
  }, []);

  return (
    <Animated.ScrollView
      contentContainerStyle={{
        paddingBottom: 30,
        paddingTop: HEADER_MAX_HEIGHT + TABVIEW_HEADER_HEIGHT,
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
                  {mockedCycles[navigationState.index].weeks} weeks
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
        style={{ height: 550}}
      />
    </Animated.ScrollView>
  );
}
