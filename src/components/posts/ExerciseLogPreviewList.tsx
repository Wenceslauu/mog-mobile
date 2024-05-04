import { ExerciseLogPreview } from "@/types/Log";
import Box from "../Box";
import Text from "../Text";
import ExerciseLogPreviewCard from "./ExerciseLogPreviewCard";

type ExerciseLogPreviewListProps = {
  exercises: ExerciseLogPreview[];
};

const EXERCISE_LOG_PREVIEW_LIST_LIMIT = 4;

export default function ExerciseLogPreviewList({
  exercises,
}: ExerciseLogPreviewListProps) {
  return (
    <Box
      gap="s"
      paddingHorizontal="m"
      paddingTop="m"
      paddingBottom="s"
      position="relative"
    >
      {exercises
        .slice(0, EXERCISE_LOG_PREVIEW_LIST_LIMIT)
        .map((exercise, index) => {
          return <ExerciseLogPreviewCard exerciseLog={exercise} key={index} />;
        })}
      <Box position="absolute" right={16} bottom={16}>
        <Text variant="body" color="onSurface" textAlign="right">
          {exercises.length === EXERCISE_LOG_PREVIEW_LIST_LIMIT
            ? ""
            : exercises.length === EXERCISE_LOG_PREVIEW_LIST_LIMIT + 1
            ? "+ 1 exercise"
            : exercises.length > EXERCISE_LOG_PREVIEW_LIST_LIMIT + 1
            ? `+ ${
                exercises.length - EXERCISE_LOG_PREVIEW_LIST_LIMIT
              } exercises`
            : null}
        </Text>
      </Box>
    </Box>
  );
}
