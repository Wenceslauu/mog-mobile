import { Theme } from "@/constants/theme";
import { useTheme } from "@shopify/restyle";
import { Pressable } from "react-native";
import Box from "../Box";
import Text from "../Text";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

type WorkoutCardProps = {
  name: string;
  workoutId: number;
};

export default function WorkoutCardDraft({
  name,
  workoutId,
}: WorkoutCardProps) {
  const { colors } = useTheme<Theme>();

  return (
    <Link href="/create-routine/edit-workout" asChild>
      <Pressable onLongPress={() => console.log("long press")}>
        {({ pressed }) => {
          return (
            <Box
              borderRadius="l"
              backgroundColor="surfaceContainer"
              padding="m"
              gap="m"
              opacity={pressed ? 0.5 : 1}
            >
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text variant="title" color="onSurface">
                  {name}
                </Text>
                <Ionicons
                  name="pencil-sharp"
                  size={25}
                  color={colors.onSurfaceContainer}
                />
              </Box>
            </Box>
          );
        }}
      </Pressable>
    </Link>
  );
}
