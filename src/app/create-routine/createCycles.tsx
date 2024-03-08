import Box from "@/components/Box";
import Text from "@/components/Text";
import { Theme } from "@/constants/theme";
import { backgroundColor, useTheme } from "@shopify/restyle";
import { useContext, useEffect, useMemo, useState } from "react";
import { Animated, Pressable, useWindowDimensions } from "react-native";
import {
  NavigationState,
  SceneRendererProps,
  TabView,
} from "react-native-tab-view";
import { CreateRoutineContext } from "@/contexts/createRoutine";
import CycleTabDraft from "@/components/routines/CycleTabDraft";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import TextInput from "@/components/TextInput";

export default function CreateCyclesScreen() {
  const { routine, setRoutine } = useContext(CreateRoutineContext);

  const { colors } = useTheme<Theme>();

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState<{ key: string; title: string }[]>([]);

  const [cycles, setCycles] = useState(routine.cycles);

  useEffect(() => {
    const cycleRoutes = cycles.map((cycle, index) => {
      return { key: index.toString(), title: cycle.name };
    });

    setRoutes(cycleRoutes);
  }, [cycles]);

  const workoutDrafts = useMemo(() => {
    if (cycles.length > 0) {
      const cycle = cycles[index];

      cycle.workouts.map((workout) => {
        return {
          name: workout.name,
          workoutId: workout.workoutId,
        };
      });
    }

    return [];
  }, [routine, index]);

  return (
    <TabView
      renderTabBar={(props) => {
        return (
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
                  //position={Animated.subtract(index, i)}
                  index={index}
                  onLongPressSave={(newTitle) => {
                    setCycles((prevCycles) => {
                      const newCycles = [...prevCycles];
                      newCycles[index].name = newTitle;
                      return newCycles;
                    });
                  }}
                />
              );
            })}
            <Pressable
              onPress={() => {
                setCycles((prevCycles) => [
                  ...prevCycles,
                  { name: "New Cycle", workouts: [] },
                ]);
              }}
            >
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
        );
      }}
      navigationState={{ index, routes }}
      // TODO: Try to optimize with shouldComponentUpdate?
      renderScene={({ route }) => {
        return <CycleTabDraft workoutDrafts={workoutDrafts} />;
      }}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

type CustomTabBarButtonProps = SceneRendererProps & {
  navigationState: NavigationState<{
    key: string;
    title: string;
  }>;
} & {
  index: number;
  onLongPressSave: (name: string) => void;
};

function CustomTabBarButton({
  navigationState,
  position,
  jumpTo,
  index,
  onLongPressSave,
}: CustomTabBarButtonProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(navigationState.routes[index].title);

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
      // Only disable onPress, not onLongPress
      onPress={!focused ? () => jumpTo(index.toString()) : undefined}
      onLongPress={() => {
        setEditing(true);
      }}
    >
      {({ pressed }) => (
        <Animated.View
          style={{
            padding: 16,
            borderRadius: 15,
            opacity: pressed && !focused ? 0.5 : 1,
            backgroundColor,
          }}
        >
          {editing ? (
            <TextInput
              value={title}
              onChangeText={setTitle}
              onBlur={() => {
                onLongPressSave(title);
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
      )}
    </Pressable>
  );
}
