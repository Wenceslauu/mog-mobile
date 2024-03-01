import blurhash from "@/constants/blurhash";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import Box from "../Box";
import Text from "../Text";
import { Image } from "expo-image";
import { ExerciseLog } from "@/types/WorkoutLog";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";

type ExerciseLogCardProps = {
  exercise: ExerciseLog;
};

export default function ExerciseLogCard({ exercise }: ExerciseLogCardProps) {
  const { colors } = useTheme<Theme>();

  return (
    <Box gap="s" padding="m" backgroundColor="surfaceContainer">
      <Link
        href={{
          pathname: `/exercises/${exercise.exerciseId}`,
          params: { name: exercise.name },
        }}
        asChild
      >
        <Pressable>
          {({ pressed }) => (
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                gap="s"
                flexDirection="row"
                alignItems="center"
                opacity={pressed ? 0.5 : 1}
              >
                <Image
                  source={exercise.image}
                  placeholder={blurhash}
                  style={{
                    width: 50,
                    height: 50,
                  }}
                />
                <Text variant="title" color="onSurface">
                  {exercise.name}
                </Text>
              </Box>
              <Ionicons
                name="chevron-forward"
                size={27}
                color={colors.onSurfaceContainer}
                style={{ opacity: pressed ? 0.5 : 1 }}
              />
            </Box>
          )}
        </Pressable>
      </Link>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        borderBottomColor="outlineVariant"
        paddingVertical="s"
        borderBottomWidth={1}
      >
        <Box flex={2}>
          <Text variant="label" color="onSurface">
            Set
          </Text>
        </Box>
        <Box flex={2}>
          <Text variant="label" color="onSurface">
            Reps
          </Text>
        </Box>
        <Box flex={1}>
          <Text variant="label" color="onSurface">
            Weight
          </Text>
        </Box>
      </Box>
      <Box gap="m">
        {exercise.sets.map((set, index) => {
          return (
            <Box
              key={index}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box flex={2}>
                <Text variant="body" color="onSurfaceContainer">
                  {index + 1}
                </Text>
              </Box>
              <Box flex={2}>
                <Text variant="body" color="onSurfaceContainer">
                  {set.reps}
                </Text>
              </Box>
              <Box flex={1}>
                <Text variant="body" color="onSurfaceContainer">
                  {set.weight} kg
                </Text>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
