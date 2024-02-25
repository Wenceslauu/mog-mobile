import { ExerciseLogPreview } from "@/types/WorkoutLog";
import Box from "../Box";
import { Image } from "expo-image";
import Text from "../Text";
import blurhash from "@/constants/blurhash";

type ExerciseLogPreviewCardProps = {
  exerciseLog: ExerciseLogPreview;
};

export default function ExerciseLogPreviewCard({
  exerciseLog,
}: ExerciseLogPreviewCardProps) {
  return (
    <Box flexDirection="row" gap="s">
      <Image
        source={exerciseLog.image}
        placeholder={blurhash}
        style={{ height: 60, width: 60 }}
      />
      <Box>
        <Text variant="body" color="onSurface">
          {exerciseLog.name}
        </Text>
        <Text variant="label" color="onSurface">
          {exerciseLog.sets} sets
        </Text>
      </Box>
    </Box>
  );
}
