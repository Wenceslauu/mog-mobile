import { ExerciseLogPreview } from "@/types/WorkoutLog";
import Box from "../Box";
import { Image } from "expo-image";
import Text from "../Text";

type ExerciseLogPreviewCardProps = {
  exerciseLog: ExerciseLogPreview;
};

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

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
