import Box from "@/components/Box";
import Table from "@/components/Table";
import Text from "@/components/Text";
import TruncatedText from "@/components/TruncatedText";
import { TargetMuscleEnum } from "@/types/Exercise";
import { ScrollView } from "react-native";

const mockedExercise = {
  name: "Bench Press",
  description:
    "The bench press is an upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench. The exercise uses the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.",
  targetMuscle: TargetMuscleEnum.Chest,
  mechanics: "Compound",
  force: "Push",
};

export default function ExerciseDetailsAboutTab() {
  return (
    <Box flex={1} gap="xs" backgroundColor="surface">
      <ScrollView
        contentContainerStyle={{ gap: 16, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <Box gap="s">
          <Text variant="title" color="onSurface" paddingHorizontal="m">
            Description
          </Text>
          <TruncatedText text={mockedExercise.description} />
        </Box>
        <Box gap="s" paddingHorizontal="m">
          <Text variant="title" color="onSurface">
            Properties
          </Text>
          <Table
            rows={[
              {
                label: "Muscle Group",
                value: TargetMuscleEnum[mockedExercise.targetMuscle],
              },
              { label: "Mechanics", value: mockedExercise.mechanics },
              { label: "Force", value: mockedExercise.force },
            ]}
          />
        </Box>
      </ScrollView>
    </Box>
  );
}
