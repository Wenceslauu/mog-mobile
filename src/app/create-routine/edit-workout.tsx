import Box from "@/components/Box";
import Button from "@/components/Button";
import ExerciseCardDraft from "@/components/create-routine/ExerciseCardDraft";
import { useCreateRoutine } from "@/providers/createRoutine";
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { ScrollView } from "react-native";

type FormData = {
  exercises: {
    id: number;
    name: string;
    image?: string;
    sets: {
      reps?: number;
      intensity?: number;
    }[];
  }[];
};

export default function EditWorkoutScreen() {
  const { routine, setRoutine, setIsDirty } = useCreateRoutine();

  useCreateRoutine;

  const { cycleIndex, workoutIndex, selectedExercises } =
    useLocalSearchParams();

  // We need to cache the indexes to avoid losing them when the user navigates back from the add-exercises screen
  // That would not be necessary if expo router had an option to merge params
  // TODO: Maybe useRef here?
  const [cachedIndexes] = useState({
    cycleIndex,
    workoutIndex,
  });

  useEffect(() => {
    if (selectedExercises) {
      const parsedSelectedExercises = JSON.parse(selectedExercises as string);

      append(parsedSelectedExercises);
    }
  }, [selectedExercises]);

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      exercises:
        routine.cycles[Number(cachedIndexes.cycleIndex)].workouts[
          Number(cachedIndexes.workoutIndex)
        ].exercises,
    },
  });

  const { fields, append } = useFieldArray({ control, name: "exercises" });

  const onSubmit = handleSubmit((data) => {
    setRoutine((draft) => {
      draft.cycles[Number(cachedIndexes.cycleIndex)].workouts[
        Number(cachedIndexes.workoutIndex)
      ].exercises = data.exercises;
    });

    setIsDirty(true);

    router.push("/create-routine/edit-cycles");
  });

  const handleAddExercise = () => {
    router.push("/create-routine/add-exercises");
  };

  return (
    <Box flex={1} paddingTop="m" backgroundColor="surface">
      <ScrollView
        contentContainerStyle={{
          gap: 16,
          paddingBottom: 30,
          paddingHorizontal: 16,
        }}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
      >
        {fields.map((field, index) => {
          return (
            <ExerciseCardDraft
              key={field.id}
              exerciseIndex={index}
              control={control}
            />
          );
        })}
        <Button variant="secondary" onPress={handleAddExercise}>
          Add exercise
        </Button>
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
