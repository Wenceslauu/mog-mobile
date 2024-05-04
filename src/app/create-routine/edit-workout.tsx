import Box from "@/components/Box";
import Button from "@/components/Button";
import ExerciseCardDraft from "@/components/createRoutine/editWorkout/ExerciseCardDraft";
import { useCreateRoutine } from "@/providers/createRoutine";
import { ExerciseSelectionSimple, ExerciseSimple } from "@/types/Exercise";
import {
  WorkoutDraftFormData,
  WorkoutExerciseDraftFormData,
} from "@/types/Routine";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { ScrollView } from "react-native";

export default function EditWorkoutScreen() {
  const { routine, setRoutine, isDirty } = useCreateRoutine();

  const { cycleIndex, workoutIndex, selectedExercises } =
    useLocalSearchParams();

  // We need to cache the indexes to avoid losing them when the user navigates back from the add-exercises screen
  // That would not be necessary if expo router had an option to merge params
  // TODO: Maybe useRef here?
  const [cachedIndexes] = useState({
    cycleIndex,
    workoutIndex,
  });

  const { control, handleSubmit, setValue } = useForm<WorkoutDraftFormData>({
    defaultValues: {
      exercises:
        routine.cycles[Number(cachedIndexes.cycleIndex)].workouts[
          Number(cachedIndexes.workoutIndex)
        ].exercises,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
  });

  useEffect(() => {
    // TODO: Appending exercises every time the page loads is not ideal, it should be done only once
    if (selectedExercises) {
      const parsedSelectedExercises: ExerciseSelectionSimple[] = JSON.parse(
        selectedExercises as string
      );

      const newExercises: WorkoutExerciseDraftFormData[] =
        parsedSelectedExercises.map((selectedExercise) => {
          return {
            exercise: selectedExercise,
            restDuration: 90,

            sets: [
              {
                isWarmup: false,
              },
            ],
          };
        });

      append(newExercises);
    }
  }, [selectedExercises]);

  const onSubmit = handleSubmit((data) => {
    setRoutine((draft) => {
      draft.cycles[Number(cachedIndexes.cycleIndex)].workouts[
        Number(cachedIndexes.workoutIndex)
      ].exercises = data.exercises;
    });

    isDirty.current = true;

    router.back();
  });

  const handleDeleteExercise = (exerciseIndex: number) => {
    remove(exerciseIndex);
  };

  return (
    <Box flex={1} paddingTop="m" backgroundColor="surface">
      <ScrollView
        contentContainerStyle={{
          gap: 16,
          paddingBottom: 40,
          paddingHorizontal: 16,
        }}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
      >
        {fields.map((field, index) => {
          return (
            <ExerciseCardDraft
              key={field.id}
              exerciseIndex={index}
              control={control}
              setValue={setValue}
              handleDeleteExercise={handleDeleteExercise}
            />
          );
        })}
        <Link
          href={{
            pathname: "/add-exercises",
            params: {
              pathBack: "/create-routine/edit-workout",
            },
          }}
          asChild
        >
          <Button variant="secondary">Add exercise</Button>
        </Link>
      </ScrollView>
      <Box
        backgroundColor="surfaceContainer"
        paddingHorizontal="m"
        paddingVertical="s"
        paddingBottom="l"
      >
        <Button variant="primary" onPress={onSubmit}>
          Save and go back
        </Button>
      </Box>
    </Box>
  );
}
