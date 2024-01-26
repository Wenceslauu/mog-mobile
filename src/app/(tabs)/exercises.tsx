import { Image } from "expo-image";
import { Pressable, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, Link } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { BottomSheetModal } from "@gorhom/bottom-sheet";
import LocalSearchBar from "@/components/LocalSearchBar";
import FilterDropdown from "@/components/FilterDropdown";

import Box from "@/components/Box";
import Text from "@/components/Text";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";
import ExerciseCard from "@/components/exercises/ExerciseCard";

type TargetMuscle =
  | "Chest"
  | "Back"
  | "Quads"
  | "Hamstrings"
  | "Calves"
  | "Abs"
  | "Shoulders"
  | "Biceps"
  | "Triceps"
  | null;

const mockedExercises = [
  {
    image: require("../../../assets/images/bench-press.jpg"),
    name: "Bench Press",
    isFavorite: true,
    personalBest: {
      weight: 225,
      reps: 5,
    },
    targetMuscle: "Chest",
  },
  {
    image: require("../../../assets/images/squat.jpg"),
    name: "Squat",
    isFavorite: true,
    personalBest: {
      weight: 315,
      reps: 5,
    },
    targetMuscle: "Quads",
  },
  {
    // image: require("../../../assets/images/deadlift.jpg"),
    name: "Deadlift",
    isFavorite: false,
    personalBest: {
      weight: 405,
      reps: 5,
    },
    targetMuscle: "Back",
  },
  {
    // image: require("../../../assets/images/overhead-press.jpg"),
    name: "Overhead Press",
    isFavorite: false,
    personalBest: {
      weight: 135,
      reps: 5,
    },
    targetMuscle: "Shoulders",
  },
  {
    // image: require("../../../assets/images/barbell-row.jpg"),
    name: "Barbell Row",
    isFavorite: false,
    personalBest: {
      weight: 225,
      reps: 5,
    },
    targetMuscle: "Back",
  },
  {
    // image: require("../../../assets/images/pull-up.jpg"),
    name: "Pull Up",
    isFavorite: false,
    personalBest: {
      weight: 0,
      reps: 10,
    },
    targetMuscle: "Back",
  },
  {
    // image: require("../../../assets/images/dumbbell-curl.jpg"),
    name: "Dumbbell Curl",
    isFavorite: false,
    personalBest: {
      weight: 50,
      reps: 10,
    },
    targetMuscle: "Biceps",
  },
  {
    // image: require("../../../assets/images/tricep-extension.jpg"),
    name: "Tricep Extension",
    isFavorite: false,
    personalBest: {
      weight: 50,
      reps: 10,
    },
    targetMuscle: "Triceps",
  },
  {
    // image: require("../../../assets/images/leg-press.jpg"),
    name: "Leg Press",
    isFavorite: false,
    personalBest: {
      weight: 500,
      reps: 10,
    },
    targetMuscle: "Quads",
  },
  {
    // image: require("../../../assets/images/leg-curl.jpg"),
    name: "Leg Curl",
    isFavorite: false,
    personalBest: {
      weight: 200,
      reps: 10,
    },
    targetMuscle: "Hamstrings",
  },
  {
    // image: require("../../../assets/images/calf-raise.jpg"),
    name: "Calf Raise",
    isFavorite: false,
    personalBest: {
      weight: 200,
      reps: 10,
    },
    targetMuscle: "Calves",
  },
  {
    // image: require("../../../assets/images/crunch.jpg"),
    name: "Crunch",
    isFavorite: false,
    personalBest: {
      weight: 0,
      reps: 25,
    },
    targetMuscle: "Abs",
  },
  {
    // image: require("../../../assets/images/leg-raise.jpg"),
    name: "Leg Raise",
    isFavorite: false,
    personalBest: {
      weight: 0,
      reps: 25,
    },
    targetMuscle: "Abs",
  },
  {
    // image: require("../../../assets/images/plank.jpg"),
    name: "Plank",
    isFavorite: false,
    personalBest: {
      weight: 0,
      reps: 120,
    },
    targetMuscle: "Abs",
  },
  {
    // image: require("../../../assets/images/dumbbell-press.jpg"),
    name: "Dumbbell Press",
    isFavorite: false,
    personalBest: {
      weight: 50,
      reps: 10,
    },
    targetMuscle: "Chest",
  },
  {
    // image: require("../../../assets/images/dumbbell-fly.jpg"),
    name: "Dumbbell Fly",
    isFavorite: false,
    personalBest: {
      weight: 50,
      reps: 10,
    },
    targetMuscle: "Chest",
  },
  {
    // image: require("../../../assets/images/dumbbell-lateral-raise.jpg"),
    name: "Dumbbell Lateral Raise",
    isFavorite: false,
    personalBest: {
      weight: 30,
      reps: 10,
    },
    targetMuscle: "Shoulders",
  },
  {
    // image: require("../../../assets/images/dumbbell-rear-delt-fly.jpg"),
    name: "Dumbbell Rear Delt Fly",
    isFavorite: false,
    personalBest: {
      weight: 30,
      reps: 10,
    },
    targetMuscle: "Shoulders",
  },
];

export default function ExercisesTab() {
  const [searchText, setSearchText] = useState("");
  const searchRegex = useMemo(() => new RegExp(searchText, "i"), [searchText]);

  const [targetMuscle, setTargetMuscle] = useState<TargetMuscle>(null);

  const { colors } = useTheme<Theme>();
  const navigation = useNavigation();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

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
          <Pressable onPress={handlePresentModalPress}>
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
  }, [navigation]);

  return (
    <Box
      flex={1}
      gap="xs"
      paddingTop="m"
      paddingHorizontal="m"
      backgroundColor="surface"
    >
      <Box alignItems="center" width="100%" zIndex={1}>
        <LocalSearchBar text={searchText} setText={setSearchText} />
        <Box height={70} alignSelf="flex-start">
          <FilterDropdown<TargetMuscle>
            name="Muscle Group"
            selected={targetMuscle}
            setSelected={setTargetMuscle}
            options={[
              "Chest",
              "Back",
              "Quads",
              "Hamstrings",
              "Calves",
              "Abs",
              "Shoulders",
              "Biceps",
              "Triceps",
            ]}
          />
        </Box>
      </Box>
      <FlashList
        keyboardDismissMode="on-drag"
        data={mockedExercises.filter(
          (exercise) =>
            searchRegex.test(exercise.name) &&
            (!targetMuscle || exercise.targetMuscle === targetMuscle)
        )}
        estimatedItemSize={106}
        renderItem={({ item }) => <ExerciseCard exercise={item} />}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={["25%", "50%"]}
        onChange={handleSheetChanges}
        backgroundStyle={{
          backgroundColor: colors.surfaceContainer,
        }}
        handleIndicatorStyle={{
          backgroundColor: colors.onSurfaceContainer,
        }}
      >
        <Box flex={1} alignItems="center">
          <Text variant="title" color="onSurfaceContainer">
            Awesome 🎉
          </Text>
        </Box>
      </BottomSheetModal>
    </Box>
  );
}
