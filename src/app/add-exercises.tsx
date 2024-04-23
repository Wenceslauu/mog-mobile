import Box from "@/components/Box";
import Button from "@/components/Button";
import FilterDropdown from "@/components/FilterDropdown";
import LocalSearchBar from "@/components/LocalSearchBar";
import ExerciseSelectionCard from "@/components/addExercises/ExerciseSelectionCard";
import generateDropdownOptionsFromEnum from "@/helpers/generateDropdownOptionsFromEnum";
import { ExerciseSelectionSimple, TargetMuscleEnum } from "@/types/Exercise";
import { FlashList } from "@shopify/flash-list";
import { Link, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import { Platform } from "react-native";

const mockedExercises = [
  {
    id: 1,
    image: "https://source.unsplash.com/random",
    name: "Bench Press",
    isFavorite: true,
    targetMuscle: TargetMuscleEnum.Chest,
  },
  {
    id: 2,
    image: "https://source.unsplash.com/random",
    name: "Squat",
    isFavorite: true,
    targetMuscle: TargetMuscleEnum.Quads,
  },
  {
    id: 3,
    // image: require("../../../assets/images/deadlift.jpg"),
    name: "Deadlift",
    isFavorite: false,
    targetMuscle: TargetMuscleEnum.Back,
  },
  {
    id: 4,
    // image: require("../../../assets/images/overhead-press.jpg"),
    name: "Overhead Press",
    isFavorite: false,
    targetMuscle: TargetMuscleEnum.Shoulders,
  },
  {
    id: 5,
    // image: require("../../../assets/images/barbell-row.jpg"),
    name: "Barbell Row",
    isFavorite: false,
    targetMuscle: TargetMuscleEnum.Back,
  },
  {
    id: 6,
    // image: require("../../../assets/images/pull-up.jpg"),
    name: "Pull Up",
    isFavorite: false,
    targetMuscle: TargetMuscleEnum.Back,
  },
  {
    id: 7,
    // image: require("../../../assets/images/dumbbell-curl.jpg"),
    name: "Dumbbell Curl",
    isFavorite: false,
    targetMuscle: TargetMuscleEnum.Biceps,
  },
  {
    id: 8,
    // image: require("../../../assets/images/tricep-extension.jpg"),
    name: "Tricep Extension",
    isFavorite: false,
    targetMuscle: TargetMuscleEnum.Triceps,
  },
  {
    id: 9,
    // image: require("../../../assets/images/leg-press.jpg"),
    name: "Leg Press",
    isFavorite: false,
    targetMuscle: TargetMuscleEnum.Quads,
  },
  {
    id: 10,
    // image: require("../../../assets/images/leg-curl.jpg"),
    name: "Leg Curl",
    isFavorite: false,
    targetMuscle: TargetMuscleEnum.Hamstrings,
  },
  {
    id: 11,
    // image: require("../../../assets/images/calf-raise.jpg"),
    name: "Calf Raise",
    isFavorite: false,
    targetMuscle: TargetMuscleEnum.Calves,
  },
  {
    id: 12,
    // image: require("../../../assets/images/crunch.jpg"),
    name: "Crunch",
    isFavorite: false,
    targetMuscle: TargetMuscleEnum.Abs,
  },
  {
    id: 13,
    // image: require("../../../assets/images/leg-raise.jpg"),
    name: "Leg Raise",
    isFavorite: false,
    targetMuscle: TargetMuscleEnum.Abs,
  },
  {
    id: 14,
    // image: require("../../../assets/images/plank.jpg"),
    name: "Plank",
    isFavorite: false,
    targetMuscle: TargetMuscleEnum.Abs,
  },
  {
    id: 15,
    // image: require("../../../assets/images/dumbbell-press.jpg"),
    name: "Dumbbell Press",
    isFavorite: false,
    targetMuscle: TargetMuscleEnum.Chest,
  },
  {
    id: 16,
    // image: require("../../../assets/images/dumbbell-fly.jpg"),
    name: "Dumbbell Fly",
    isFavorite: false,
    targetMuscle: TargetMuscleEnum.Chest,
  },
  {
    id: 17,
    // image: require("../../../assets/images/dumbbell-lateral-raise.jpg"),
    name: "Dumbbell Lateral Raise",
    isFavorite: false,
    targetMuscle: TargetMuscleEnum.Shoulders,
  },
  {
    id: 18,
    // image: require("../../../assets/images/dumbbell-rear-delt-fly.jpg"),
    name: "Dumbbell Rear Delt Fly",
    isFavorite: false,
    targetMuscle: TargetMuscleEnum.Shoulders,
  },
];

export default function AddExercisesModalScreen() {
  const { pathBack } = useLocalSearchParams();

  const [searchText, setSearchText] = useState("");
  const searchRegex = useMemo(() => new RegExp(searchText, "i"), [searchText]);

  const [targetMuscle, setTargetMuscle] = useState<TargetMuscleEnum | null>(
    null
  );

  const [selectedExercises, setSelectedExercises] = useState<
    ExerciseSelectionSimple[]
  >([]);

  const toggleSelectedExercise = (exercise: ExerciseSelectionSimple) => {
    if (selectedExercises.some((e) => e.id === exercise.id)) {
      setSelectedExercises((prev) => prev.filter((e) => e.id !== exercise.id));
    } else {
      setSelectedExercises((prev) => [...prev, exercise]);
    }
  };

  return (
    <Box flex={1} gap="xs" paddingTop="m" backgroundColor="surface">
      <Box alignItems="center" width="100%" zIndex={1} paddingHorizontal="m">
        <LocalSearchBar text={searchText} setText={setSearchText} />
        <Box alignSelf="flex-start">
          <FilterDropdown<TargetMuscleEnum>
            name="Muscle Group"
            selected={targetMuscle}
            setSelected={setTargetMuscle}
            options={generateDropdownOptionsFromEnum<typeof TargetMuscleEnum>(
              TargetMuscleEnum
            )}
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
        renderItem={({ item }) => (
          <ExerciseSelectionCard
            exercise={item}
            toggleSelectedExercise={toggleSelectedExercise}
            isSelected={selectedExercises.some((e) => e.id === item.id)}
            selectedIndex={selectedExercises.findIndex((e) => e.id === item.id)}
          />
        )}
        ItemSeparatorComponent={() => <Box height={4} />}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
      {selectedExercises.length > 0 ? (
        <Box
          backgroundColor="surfaceContainer"
          paddingHorizontal="m"
          paddingVertical="s"
          paddingBottom="l"
        >
          <Link
            href={{
              pathname: pathBack,
              params: { selectedExercises: JSON.stringify(selectedExercises) },
            }}
            asChild
          >
            <Button variant="primary">
              Add {selectedExercises.length} Exercises
            </Button>
          </Link>
        </Box>
      ) : null}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </Box>
  );
}
