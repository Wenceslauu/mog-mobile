import Box from "@/components/Box";
import Button from "@/components/Button";
import ExerciseCardDraft from "@/components/create-routine/ExerciseCardDraft";
import { CreateRoutineContext } from "@/contexts/createRoutine";
import { router, useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { ScrollView } from "react-native";

type FormData = {
  exercises: {
    id: number;
    name: string;
    sets: {
      reps?: number;
      intensity?: number;
    }[];
  }[];
};

export default function EditWorkoutScreen() {
  const { routine, setRoutine, setIsDirty } = useContext(CreateRoutineContext);

  const { cycleIndex, workoutIndex } = useLocalSearchParams();

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      exercises:
        routine.cycles[Number(cycleIndex)].workouts[Number(workoutIndex)]
          .exercises,
    },
  });

  const { fields, append } = useFieldArray({ control, name: "exercises" });

  const onSubmit = handleSubmit((data) => {
    setRoutine((draft) => {
      draft.cycles[Number(cycleIndex)].workouts[
        Number(workoutIndex)
      ].exercises = data.exercises;
    });

    setIsDirty(true);

    router.push("/create-routine/edit-cycles");
  });

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
        <Button variant="secondary">Add exercise</Button>
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
