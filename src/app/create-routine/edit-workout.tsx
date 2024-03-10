import Box from "@/components/Box";
import Text from "@/components/Text";
import { useLocalSearchParams } from "expo-router";

export default function EditWorkoutScreen() {
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
