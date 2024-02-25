import Box from "@/components/Box";
import Text from "@/components/Text";
import { Theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { useState } from "react";
import { Pressable, View, useWindowDimensions } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#ff4081" }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

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
        name: "Upper 1",
        exercises: [
          {
            name: "DB Bench Press",
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
        name: "Lower 2",
        exercises: [
          {
            name: "Hack Squat",
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

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ]);

  return (
    <TabView
      renderTabBar={({ navigationState, jumpTo }) => {
        const inputRange = navigationState.routes.map((x, i) => i);

        return (
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            paddingVertical="m"
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
              {/* TODO: Fix the jumpTo */}
              <Pressable onPress={() => jumpTo("first")}>
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
                {navigationState.index + 1} /{" "}
                {mockedCycles[navigationState.index].workouts.length} cycles
              </Text>
              {/* TODO: Fix the jumpTo */}
              <Pressable onPress={() => jumpTo("second")}>
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
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}
