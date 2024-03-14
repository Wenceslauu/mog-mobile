import { Pressable } from "react-native";
import { Image } from "expo-image";
import { Theme } from "@/constants/theme";
import blurhash from "@/constants/blurhash";
import Box from "../Box";
import Text from "../Text";
import { ExerciseSelection, ExerciseSelectionSimple } from "@/types/Exercise";
import { useTheme } from "@shopify/restyle";

type ExerciseSelectionCardProps = {
  exercise: ExerciseSelection;
  isSelected: boolean;
  selectedIndex: number;
  toggleSelectedExercise: (exercise: ExerciseSelectionSimple) => void;
};

export default function ExerciseSelectionCard({
  exercise,
  isSelected,
  selectedIndex,
  toggleSelectedExercise,
}: ExerciseSelectionCardProps) {
  const { colors } = useTheme<Theme>();

  return (
    <Pressable
      onPress={() => {
        toggleSelectedExercise({
          id: exercise.id,
          name: exercise.name,
          image: exercise.image,
          sets: [
            {
              reps: undefined,
              intensity: undefined,
            },
          ],
        });
      }}
    >
      {({ pressed }) => (
        <Box
          flexDirection="row"
          gap="s"
          height={90}
          padding="s"
          backgroundColor="surfaceContainer"
          paddingHorizontal="m"
          opacity={pressed ? 0.5 : 1}
        >
          <Image
            source={exercise.image}
            placeholder={blurhash}
            style={{
              width: "20%",
              backgroundColor: colors.secondary,
            }}
          />
          <Box flex={1} flexDirection="row" alignItems="center">
            <Box flex={1} alignSelf="flex-start">
              <Text variant="title" color="onSurface">
                {exercise.name}
              </Text>
              <Text variant="label" color="onSurface">
                {exercise.targetMuscle}
              </Text>
            </Box>
            {isSelected ? (
              <Box
                width={32}
                height={32}
                borderRadius="full"
                backgroundColor="primary"
                justifyContent="center"
                alignItems="center"
              >
                <Text variant="body" color="onPrimary">
                  {selectedIndex + 1}
                </Text>
              </Box>
            ) : null}
          </Box>
        </Box>
      )}
    </Pressable>
  );
}
