import Box from "@/components/Box";
import Text from "@/components/Text";
import { CreateRoutineContext } from "@/contexts/createRoutine";
import { useLocalSearchParams } from "expo-router";
import { useContext } from "react";

export default function EditWorkoutScreen() {
  const { routine, setRoutine } = useContext(CreateRoutineContext);
  
  const { id } = useLocalSearchParams();

  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor="surface"
    >
      <Text variant="title" color="onSurface">
        Create Workout: {id}
      </Text>
    </Box>
  );
}
