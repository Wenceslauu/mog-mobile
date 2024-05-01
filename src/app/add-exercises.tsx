import Box from "@/components/Box";
import Button from "@/components/Button";
import FilterDropdown from "@/components/FilterDropdown";
import LocalSearchBar from "@/components/LocalSearchBar";
import ExerciseSelectionCard from "@/components/addExercises/ExerciseSelectionCard";
import generateDropdownOptionsFromEnum from "@/helpers/generateDropdownOptionsFromEnum";
import { createRandomExerciseSelection } from "@/helpers/mocks/Exercise";
import { ExerciseSimple, ExerciseTargetMuscleEnum } from "@/types/Exercise";
import { FlashList } from "@shopify/flash-list";
import { Link, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import { Platform } from "react-native";

const mockedExerciseSelections = Array.from(
  { length: 20 },
  createRandomExerciseSelection
);

export default function AddExercisesModalScreen() {
  const { pathBack } = useLocalSearchParams();

  const [searchText, setSearchText] = useState("");
  const searchRegex = useMemo(() => new RegExp(searchText, "i"), [searchText]);

  const [targetMuscle, setTargetMuscle] =
    useState<ExerciseTargetMuscleEnum | null>(null);

  const [selectedExercises, setSelectedExercises] = useState<ExerciseSimple[]>(
    []
  );

  const toggleSelectedExercise = (exercise: ExerciseSimple) => {
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
          <FilterDropdown<ExerciseTargetMuscleEnum>
            name="Muscle Group"
            selected={targetMuscle}
            setSelected={setTargetMuscle}
            options={generateDropdownOptionsFromEnum<
              typeof ExerciseTargetMuscleEnum
            >(ExerciseTargetMuscleEnum)}
          />
        </Box>
      </Box>
      <FlashList
        keyboardDismissMode="on-drag"
        data={mockedExerciseSelections.filter(
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
