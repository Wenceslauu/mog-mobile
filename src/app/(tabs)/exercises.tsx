import { Pressable } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, Link } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";

import LocalSearchBar from "@/components/LocalSearchBar";
import FilterDropdown from "@/components/FilterDropdown";

import Box from "@/components/Box";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";
import ExerciseCard from "@/components/exercises/ExerciseCard";
import { useScrollToTop } from "@react-navigation/native";
import { useActionSheet } from "@/providers/actionSheet";
import { Exercise, TargetMuscle, TargetMuscleEnum } from "@/types/Exercise";
import generateDropdownOptionsFromEnum from "@/helpers/generateDropdownOptionsFromEnum";

const mockedExercises: Exercise[] = [
  {
    id: 1,
    image: require("../../../assets/images/bench-press.jpg"),
    name: "Bench Press",
    isFavorite: true,
    personalBest: {
      weight: 225,
      reps: 5,
    },
    targetMuscle: TargetMuscleEnum.Chest,
  },
  {
    id: 2,
    image: require("../../../assets/images/squat.jpg"),
    name: "Squat",
    isFavorite: true,
    personalBest: {
      weight: 315,
      reps: 5,
    },
    targetMuscle: TargetMuscleEnum.Quads,
  },
  {
    id: 3,
    // image: require("../../../assets/images/deadlift.jpg"),
    name: "Deadlift",
    isFavorite: false,
    personalBest: {
      weight: 405,
      reps: 5,
    },
    targetMuscle: TargetMuscleEnum.Back,
  },
  {
    id: 4,
    // image: require("../../../assets/images/overhead-press.jpg"),
    name: "Overhead Press",
    isFavorite: false,
    personalBest: {
      weight: 135,
      reps: 5,
    },
    targetMuscle: TargetMuscleEnum.Shoulders,
  },
  {
    id: 5,
    // image: require("../../../assets/images/barbell-row.jpg"),
    name: "Barbell Row",
    isFavorite: false,
    personalBest: {
      weight: 225,
      reps: 5,
    },
    targetMuscle: TargetMuscleEnum.Back,
  },
  {
    id: 6,
    // image: require("../../../assets/images/pull-up.jpg"),
    name: "Pull Up",
    isFavorite: false,
    personalBest: {
      weight: 0,
      reps: 10,
    },
    targetMuscle: TargetMuscleEnum.Back,
  },
  {
    id: 7,
    // image: require("../../../assets/images/dumbbell-curl.jpg"),
    name: "Dumbbell Curl",
    isFavorite: false,
    personalBest: {
      weight: 50,
      reps: 10,
    },
    targetMuscle: TargetMuscleEnum.Biceps,
  },
  {
    id: 8,
    // image: require("../../../assets/images/tricep-extension.jpg"),
    name: "Tricep Extension",
    isFavorite: false,
    personalBest: {
      weight: 50,
      reps: 10,
    },
    targetMuscle: TargetMuscleEnum.Triceps,
  },
  {
    id: 9,
    // image: require("../../../assets/images/leg-press.jpg"),
    name: "Leg Press",
    isFavorite: false,
    personalBest: {
      weight: 500,
      reps: 10,
    },
    targetMuscle: TargetMuscleEnum.Quads,
  },
  {
    id: 10,
    // image: require("../../../assets/images/leg-curl.jpg"),
    name: "Leg Curl",
    isFavorite: false,
    personalBest: {
      weight: 200,
      reps: 10,
    },
    targetMuscle: TargetMuscleEnum.Hamstrings,
  },
  {
    id: 11,
    // image: require("../../../assets/images/calf-raise.jpg"),
    name: "Calf Raise",
    isFavorite: false,
    personalBest: {
      weight: 200,
      reps: 10,
    },
    targetMuscle: TargetMuscleEnum.Calves,
  },
  {
    id: 12,
    // image: require("../../../assets/images/crunch.jpg"),
    name: "Crunch",
    isFavorite: false,
    personalBest: {
      weight: 0,
      reps: 25,
    },
    targetMuscle: TargetMuscleEnum.Abs,
  },
  {
    id: 13,
    // image: require("../../../assets/images/leg-raise.jpg"),
    name: "Leg Raise",
    isFavorite: false,
    personalBest: {
      weight: 0,
      reps: 25,
    },
    targetMuscle: TargetMuscleEnum.Abs,
  },
  {
    id: 14,
    // image: require("../../../assets/images/plank.jpg"),
    name: "Plank",
    isFavorite: false,
    personalBest: {
      weight: 0,
      reps: 120,
    },
    targetMuscle: TargetMuscleEnum.Abs,
  },
  {
    id: 15,
    // image: require("../../../assets/images/dumbbell-press.jpg"),
    name: "Dumbbell Press",
    isFavorite: false,
    personalBest: {
      weight: 50,
      reps: 10,
    },
    targetMuscle: TargetMuscleEnum.Chest,
  },
  {
    id: 16,
    // image: require("../../../assets/images/dumbbell-fly.jpg"),
    name: "Dumbbell Fly",
    isFavorite: false,
    personalBest: {
      weight: 50,
      reps: 10,
    },
    targetMuscle: TargetMuscleEnum.Chest,
  },
  {
    id: 17,
    // image: require("../../../assets/images/dumbbell-lateral-raise.jpg"),
    name: "Dumbbell Lateral Raise",
    isFavorite: false,
    personalBest: {
      weight: 30,
      reps: 10,
    },
    targetMuscle: TargetMuscleEnum.Shoulders,
  },
  {
    id: 18,
    // image: require("../../../assets/images/dumbbell-rear-delt-fly.jpg"),
    name: "Dumbbell Rear Delt Fly",
    isFavorite: false,
    personalBest: {
      weight: 30,
      reps: 10,
    },
    targetMuscle: TargetMuscleEnum.Shoulders,
  },
];

export default function ExercisesTab() {
  const [searchText, setSearchText] = useState("");
  const searchRegex = useMemo(() => new RegExp(searchText, "i"), [searchText]);

  const [targetMuscle, setTargetMuscle] = useState<TargetMuscleEnum | null>(
    null
  );

  const { openActionSheet } = useActionSheet();

  const { colors } = useTheme<Theme>();
  const navigation = useNavigation();

  const exercisesListRef = useRef(null);

  // Scroll to top when the active tab is tapped
  useScrollToTop(exercisesListRef);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Box flexDirection="row">
          <Link href="/create-exercise" asChild>
            <Pressable>
              {({ pressed }) => (
                <Ionicons
                  name="add-circle-outline"
                  size={29}
                  color={colors.onSurfaceContainer}
                  style={{ marginRight: 8, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
          <Pressable
            onPress={() => {
              openActionSheet([
                {
                  name: "Change achievement in display",
                  callback: () => console.log("Change achievement in display"),
                },
              ]);
            }}
          >
            {({ pressed }) => (
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={29}
                color={colors.onSurfaceContainer}
                style={{
                  marginRight: 15,
                  marginTop: 1,
                  opacity: pressed ? 0.5 : 1,
                }}
              />
            )}
          </Pressable>
        </Box>
      ),
    });
  }, [navigation, colors]);

  return (
    <>
      <Box flex={1} gap="xs" paddingTop="m" backgroundColor="surface">
        <Box alignItems="center" width="100%" zIndex={1} paddingHorizontal="m">
          <LocalSearchBar text={searchText} setText={setSearchText} />
          <Box height={70} alignSelf="flex-start">
            <FilterDropdown<TargetMuscleEnum, typeof TargetMuscleEnum>
              name="Muscle Group"
              selected={targetMuscle}
              setSelected={setTargetMuscle}
              options={generateDropdownOptionsFromEnum<typeof TargetMuscleEnum>(
                TargetMuscleEnum
              )}
              enumMap={TargetMuscleEnum}
            />
          </Box>
        </Box>
        <FlashList
          ref={exercisesListRef}
          keyboardDismissMode="on-drag"
          data={mockedExercises.filter(
            (exercise) =>
              searchRegex.test(exercise.name) &&
              (!targetMuscle || exercise.targetMuscle === targetMuscle)
          )}
          estimatedItemSize={106}
          renderItem={({ item }) => <ExerciseCard exercise={item} />}
          ItemSeparatorComponent={() => <Box height={4} />}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      </Box>
    </>
  );
}
