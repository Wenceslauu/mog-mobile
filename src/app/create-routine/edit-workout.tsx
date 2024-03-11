import Box from "@/components/Box";
import Button from "@/components/Button";
import ExerciseCardDraft from "@/components/create-routine/ExerciseCardDraft";
import { CreateRoutineContext } from "@/contexts/createRoutine";
import { useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { ScrollView } from "react-native";

export default function EditWorkoutScreen() {
  const { routine, setRoutine, setIsDirty } = useContext(CreateRoutineContext);

  const { cycleIndex, workoutIndex } = useLocalSearchParams();

  const handleAddSet = (exerciseIndex: number) => {
    const newSet = {
      reps: 0,
      intensity: "",
    };

    setRoutine((draft) => {
      draft.cycles[Number(cycleIndex)].workouts[Number(workoutIndex)].exercises[
        exerciseIndex
      ].sets.push(newSet);
    });

    setIsDirty(true);
  };

  return (
    <Box
      flex={1}
      paddingTop="m"
      paddingHorizontal="m"
      backgroundColor="surface"
    >
      <ScrollView
        contentContainerStyle={{
          gap: 16,
          paddingBottom: 30,
        }}
        showsVerticalScrollIndicator={false}
      >
        {routine.cycles[Number(cycleIndex)].workouts[
          Number(workoutIndex)
        ].exercises.map((exerciseDraft, index) => {
          return (
            <ExerciseCardDraft
              key={index}
              exerciseDraft={exerciseDraft}
              handleAddSet={() => handleAddSet(index)}
            />
          );
        })}
        <Button variant="secondary">Add exercise</Button>
      </ScrollView>
    </Box>
  );
}
