import Box from "@/components/Box";
import Table from "@/components/Table";
import Text from "@/components/Text";
import TruncatedText from "@/components/TruncatedText";
import {
  Exercise,
  ExerciseForceEnum,
  ExerciseMechanicEnum,
  ExerciseTargetMuscleEnum,
} from "@/types/Exercise";
import { faker } from "@faker-js/faker";
import { ScrollView } from "react-native";

const mockedExercise: Exercise = {
  id: faker.string.uuid(),
  name: faker.vehicle.manufacturer(),
  instructions: faker.lorem.paragraphs(3),
  image: faker.image.urlLoremFlickr({ category: "gym" }),
  targetMuscle: faker.helpers.enumValue(ExerciseTargetMuscleEnum),
  mechanic: faker.helpers.enumValue(ExerciseMechanicEnum),
  force: faker.helpers.enumValue(ExerciseForceEnum),
  isFavorite: faker.datatype.boolean(),
};

export default function ExerciseDetailsAboutTab() {
  return (
    <Box flex={1} gap="xs" backgroundColor="surface">
      <ScrollView
        contentContainerStyle={{ gap: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Box gap="s">
          <Text variant="title" color="onSurface" paddingHorizontal="m">
            Description
          </Text>
          <TruncatedText text={mockedExercise.instructions} />
        </Box>
        <Box gap="s" paddingHorizontal="m">
          <Text variant="title" color="onSurface">
            Properties
          </Text>
          <Table
            rows={[
              {
                label: "Muscle Group",
                value: ExerciseTargetMuscleEnum[mockedExercise.targetMuscle],
              },
              {
                label: "Mechanics",
                value: ExerciseMechanicEnum[mockedExercise.mechanic],
              },
              {
                label: "Force",
                value: ExerciseForceEnum[mockedExercise.force],
              },
            ]}
          />
        </Box>
      </ScrollView>
    </Box>
  );
}
