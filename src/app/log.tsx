import Box from "@/components/Box";
import Button from "@/components/Button";
import Text from "@/components/Text";
import ExerciseLogCardDraft from "@/components/log/ExerciseLogCardDraft";
import { WorkoutLogDraftFormData } from "@/types/WorkoutLog";
import { Link, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Platform, ScrollView } from "react-native";

const mockedWorkout = {
  name: "Upper",
  exercises: [
    {
      id: 1,
      name: "Bench Press",
      image: "https://source.unsplash.com/random",
      sets: [
        { targetReps: 12, targetIntensity: 7 },
        { targetReps: 10, targetIntensity: 8 },
        { targetReps: 10, targetIntensity: 8 },
        { targetReps: 8, targetIntensity: 9 },
      ],
    },
  ],
};

export default function LogModalScreen() {
  const { selectedExercises } = useLocalSearchParams();

  const { control, setValue, handleSubmit } = useForm<WorkoutLogDraftFormData>({
    defaultValues: {
      exercises: mockedWorkout.exercises,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
  });

  useEffect(() => {
    if (selectedExercises) {
      const parsedSelectedExercises = JSON.parse(selectedExercises as string);

      append(parsedSelectedExercises);
    }
  }, [selectedExercises]);

  const handleDeleteExercise = (exerciseIndex: number) => {
    remove(exerciseIndex);
  };

  return (
    <Box
      flex={1}
      gap="s"
      paddingTop="m"
      paddingHorizontal="m"
      backgroundColor="surface"
    >
      <Text variant="title" color="onSurface">
        {mockedWorkout.name}
      </Text>
      <ScrollView
        contentContainerStyle={{
          gap: 16,
          paddingBottom: 30,
        }}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
      >
        {fields.map((field, index) => {
          return (
            <ExerciseLogCardDraft
              key={field.id}
              exerciseIndex={index}
              control={control}
              setValue={setValue}
              handleDeleteExercise={handleDeleteExercise}
            />
          );
        })}
        <Link
          href={{
            pathname: "/add-exercises",
            params: {
              pathBack: "/log",
            },
          }}
          asChild
        >
          <Button variant="secondary">Add exercise</Button>
        </Link>
      </ScrollView>
      <StatusBar style={Platform.OS === "ios" ? "dark" : "light"} />
    </Box>
  );
}
