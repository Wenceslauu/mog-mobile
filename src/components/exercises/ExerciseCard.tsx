import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { Pressable } from "react-native";
import Box from "../Box";
import Text from "../Text";
import { Exercise } from "@/types/Exercise";
import { Image } from "expo-image";
import { Theme } from "@/constants/theme";
import blurhash from "@/constants/blurhash";
import { Link } from "expo-router";

type ExerciseCardProps = {
  exercise: Exercise;
};

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  const { colors } = useTheme<Theme>();

  return (
    <Link
      href={{
        pathname: `/exercises/${exercise.id}`,
        params: { name: exercise.name },
      }}
      asChild
    >
      <Pressable>
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
            <Box flex={1} flexDirection="row">
              <Box flex={1} alignSelf="flex-start">
                <Text variant="title" color="onSurface">
                  {exercise.name}
                </Text>
                <Text variant="label" color="onSurface">
                  {exercise.targetMuscle}
                </Text>
              </Box>
              <Box flexDirection="row" gap="s">
                <Box alignSelf="flex-end">
                  <Text variant="label" color="onSurface">
                    {exercise.personalBest.weight} kg -{" "}
                    {exercise.personalBest.reps}
                  </Text>
                </Box>
                <Pressable
                  onPress={() => console.log("FAVORITE")}
                  style={{ alignSelf: "center" }}
                >
                  {({ pressed }) => (
                    <Ionicons
                      name={`bookmark${exercise.isFavorite ? "" : "-outline"}`}
                      size={29}
                      color={exercise.isFavorite ? colors.primary : colors.onSurface}
                      style={{
                        opacity: pressed ? 0.5 : 1,
                      }}
                    />
                  )}
                </Pressable>
              </Box>
            </Box>
          </Box>
        )}
      </Pressable>
    </Link>
  );
}
