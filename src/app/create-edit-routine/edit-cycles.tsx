import Box from "@/components/Box";
import Text from "@/components/Text";
import { Theme } from "@/constants/theme";
import { useTheme } from "@shopify/restyle";
import { useEffect, useState } from "react";
import {
  Animated,
  Pressable,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import {
  NavigationState,
  SceneRendererProps,
  TabView,
} from "react-native-tab-view";
import { useCreateRoutine } from "@/providers/createRoutine";
import CycleTabDraft from "@/components/createRoutine/editCycles/CycleTabDraft";
import { Ionicons } from "@expo/vector-icons";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import { Link } from "expo-router";
import { useActionSheet } from "@/providers/actionSheet";
import * as Haptics from "expo-haptics";
import useLongPressStyle from "@/hooks/useLongPressStyle";
import { faker } from "@faker-js/faker";
import { WorkoutDraft } from "@/types/Routine";

export default function EditCyclesScreen() {
  const { routine, setRoutine, isDirty } = useCreateRoutine();

  const { colors } = useTheme<Theme>();

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState<{ key: string; title: string }[]>([]);

  useEffect(() => {
    const cycleRoutes = routine.cycles.map((cycle, index) => {
      return { key: index.toString(), title: cycle.name };
    });

    setRoutes(cycleRoutes);
  }, [routine.cycles]);

  const handleAddCycle = () => {
    const newCycle = {
      name: "New Cycle",
      workouts: [],
    };

    setRoutine((draft) => {
      draft.cycles.push(newCycle);
    });

    isDirty.current = true;
  };

  const handleDeleteCycle = (cycleIndex: number) => {
    setRoutine((draft) => {
      draft.cycles.splice(cycleIndex, 1);
    });
  };

  const handleRenameCycle = (newName: string, cycleIndex: number) => {
    if (routine.cycles[cycleIndex].name === newName) return;

    setRoutine((draft) => {
      draft.cycles[cycleIndex].name = newName;
    });

    isDirty.current = true;
  };

  const handleAddWorkout = (cycleIndex: number) => {
    const newWorkout = {
      // TODO: generate a random id
      id: faker.string.uuid(),
      name: "New Workout",
      exercises: [],
    };

    setRoutine((draft) => {
      draft.cycles[cycleIndex].workouts.push(newWorkout);
    });

    isDirty.current = true;
  };

  const handleDeleteWorkout = (cycleIndex: number, workoutIndex: number) => {
    setRoutine((draft) => {
      draft.cycles[cycleIndex].workouts.splice(workoutIndex, 1);
    });

    isDirty.current = true;
  };

  const handleRenameWorkout = (
    newName: string,
    cycleIndex: number,
    workoutIndex: number
  ) => {
    if (routine.cycles[cycleIndex].workouts[workoutIndex].name === newName)
      return;

    setRoutine((draft) => {
      draft.cycles[cycleIndex].workouts[workoutIndex].name = newName;
    });

    isDirty.current = true;
  };

  const handleReorderWorkouts = (
    newWorkoutDrafts: WorkoutDraft[],
    cycleIndex: number
  ) => {
    setRoutine((draft) => {
      draft.cycles[cycleIndex].workouts = newWorkoutDrafts;
    });

    isDirty.current = true;
  };

  return (
    <>
      <TabView
        renderTabBar={(props) => {
          return (
            // https://stackoverflow.com/questions/49373417/react-native-scrollview-height-always-stays-static-and-does-not-change
            <Box>
              <ScrollView
                horizontal
                contentContainerStyle={{
                  gap: 8,
                  padding: 16,
                }}
                showsHorizontalScrollIndicator={false}
              >
                {props.navigationState.routes.map((route, index) => {
                  return (
                    <CustomTabBarButton
                      {...props}
                      key={index}
                      index={index}
                      handleRenameCycle={handleRenameCycle}
                      handleDeleteCycle={handleDeleteCycle}
                    />
                  );
                })}
                <Pressable onPress={handleAddCycle}>
                  {({ pressed }) => (
                    <Box
                      width={50}
                      height={50}
                      borderRadius="full"
                      backgroundColor="surfaceContainer"
                      opacity={pressed ? 0.5 : 1}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Ionicons
                        name="add"
                        size={25}
                        color={colors.onSurfaceContainer}
                      />
                    </Box>
                  )}
                </Pressable>
              </ScrollView>
            </Box>
          );
        }}
        navigationState={{ index, routes }}
        // TODO: Try to optimize with shouldComponentUpdate?
        renderScene={({ route }) => {
          // TODO: Add empty state view to encourage users to add a cycle
          if (!routine.cycles[Number(route.key)]) return null;

          return (
            <CycleTabDraft
              // If index is used here, there is a big delay and layout shift on scene change
              workoutDrafts={routine.cycles[Number(route.key)].workouts}
              cycleIndex={Number(route.key)}
              handleAddWorkout={() => handleAddWorkout(Number(route.key))}
              handleDeleteWorkout={handleDeleteWorkout}
              handleRenameWorkout={handleRenameWorkout}
              handleReorderWorkouts={handleReorderWorkouts}
            />
          );
        }}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
      <Box
        backgroundColor="surfaceContainer"
        paddingHorizontal="m"
        paddingVertical="s"
        paddingBottom="l"
      >
        <Link href="/create-edit-routine/extra-data" asChild>
          <Button variant="primary">Next</Button>
        </Link>
      </Box>
    </>
  );
}

type CustomTabBarButtonProps = SceneRendererProps & {
  navigationState: NavigationState<{
    key: string;
    title: string;
  }>;
} & {
  index: number;
  handleRenameCycle: (name: string, cycleIndex: number) => void;
  handleDeleteCycle: (cycleIndex: number) => void;
};

function CustomTabBarButton({
  navigationState,
  position,
  jumpTo,
  index,
  handleRenameCycle,
  handleDeleteCycle,
}: CustomTabBarButtonProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(navigationState.routes[index].title);

  const { openActionSheet } = useActionSheet();
  const { opacity, scale, handlePressIn, handlePressOut } = useLongPressStyle();

  const { colors } = useTheme<Theme>();

  const focused = navigationState.index === index;

  let backgroundColor: string | Animated.AnimatedInterpolation<number> =
    colors.secondaryContainer;

  if (navigationState.routes.length > 1) {
    const inputRange = navigationState.routes.map((_, i) => i);

    backgroundColor = position.interpolate({
      inputRange,
      outputRange: inputRange.map((i) =>
        i === index ? colors.secondaryContainer : colors.surfaceContainer
      ),
    });
  }

  return (
    // TODO: Create tooltip, or onboarding step to show how to edit cycle name
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      // Only disable onPress, not onLongPress
      onPress={!focused ? () => jumpTo(index.toString()) : undefined}
      onLongPress={() => {
        Haptics.selectionAsync();

        openActionSheet([
          {
            name: "Delete Cycle",
            callback: () => {
              handleDeleteCycle(index);
            },
          },
          {
            name: "Edit Cycle Name",
            callback: () => {
              setEditing(true);
            },
          },
        ]);
      }}
    >
      <Animated.View
        style={{
          padding: 16,
          borderRadius: 15,
          opacity: focused ? 1 : opacity,
          transform: [{ scale }],
          backgroundColor,
        }}
      >
        {editing ? (
          <TextInput
            value={title}
            onChangeText={setTitle}
            onBlur={() => {
              handleRenameCycle(title, index);
              setEditing(false);
            }}
            variant="body"
            color={focused ? "onSecondaryContainer" : "onSurfaceContainer"}
            textTransform="capitalize"
            selectionColor={colors.primary}
            autoFocus
          />
        ) : (
          <Text
            variant="body"
            textTransform="capitalize"
            color={focused ? "onSecondaryContainer" : "onSurfaceContainer"}
          >
            {navigationState.routes[index].title}
          </Text>
        )}
      </Animated.View>
    </Pressable>
  );
}
