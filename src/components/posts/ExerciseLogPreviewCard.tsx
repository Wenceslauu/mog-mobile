import { ExerciseLogPreview } from "@/types/Log";
import Box from "../Box";
import { Image } from "expo-image";
import Text from "../Text";
import blurhash from "@/constants/blurhash";
import { Link } from "expo-router";
import { Pressable } from "react-native";

type ExerciseLogPreviewCardProps = {
  exerciseLog: ExerciseLogPreview;
};

export default function ExerciseLogPreviewCard({
  exerciseLog,
}: ExerciseLogPreviewCardProps) {
  return (
    <Link
      href={{
        pathname: `/exercises/${exerciseLog.exercise.id}`,
        params: { name: exerciseLog.exercise.name },
      }}
      asChild
    >
      <Pressable>
        {({ pressed }) => (
          <Box flexDirection="row" gap="s" opacity={pressed ? 0.5 : 1}>
            <Image
              source={exerciseLog.exercise.image}
              placeholder={blurhash}
              style={{ height: 60, width: 60 }}
            />
            <Box>
              <Text variant="body" color="onSurface">
                {exerciseLog.exercise.name}
              </Text>
              <Text variant="label" color="onSurface">
                {exerciseLog.sets} sets
              </Text>
            </Box>
          </Box>
        )}
      </Pressable>
    </Link>
  );
}
