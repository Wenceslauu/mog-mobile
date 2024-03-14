import Box from "@/components/Box";
import Text from "@/components/Text";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";

export default function AddExercisesModalScreen() {
  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor="surface"
    >
      <Text variant="title" color="onSurface">
        Add Exercises
      </Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </Box>
  );
}
