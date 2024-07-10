import Box from "@/components/Box";
import Button from "@/components/Button";
import Text from "@/components/Text";
import ExerciseLogCardDraft from "@/components/log/ExerciseLogCardDraft";
import { createRandomWorkoutLogDraft } from "@/helpers/mocks/Log";
import {
  EnduranceCriteriaEnum,
  ExerciseForceEnum,
  ExerciseSelectionSimple,
} from "@/types/Exercise";
import { ExerciseLogDraft, WorkoutLogDraftFormData } from "@/types/Log";
import { Link, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Platform, ScrollView } from "react-native";

const mockedWorkout = createRandomWorkoutLogDraft();

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
    // TODO: Appending exercises every time the page loads is not ideal, it should be done only once
    if (selectedExercises) {
      const parsedSelectedExercises: ExerciseSelectionSimple[] = JSON.parse(
        selectedExercises as string
      );

      const newExercises: ExerciseLogDraft[] = parsedSelectedExercises.map(
        (selectedExercise) => {
          return {
            exercise: selectedExercise,
            isFreestyle: true,
            enduranceCriteria:
              selectedExercise.force === ExerciseForceEnum.Isometric
                ? EnduranceCriteriaEnum.Time
                : EnduranceCriteriaEnum.Reps,
            sets: [
              {
                isWarmup: false,
              },
            ],
          };
        }
      );

      append(newExercises);
    }
  }, [selectedExercises]);

  const handleDeleteExercise = (exerciseIndex: number) => {
    remove(exerciseIndex);
  };

  return (
    <Box flex={1} paddingTop="m" backgroundColor="surface">
      <Box paddingHorizontal="m">
        <Text variant="title" color="onSurface">
          {mockedWorkout.workout?.name}
        </Text>
      </Box>
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : undefined}
      > */}
      {/* <KeyboardAwareScrollView
        contentContainerStyle={{
          gap: 16,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
      > */}
      <ScrollView
        contentContainerStyle={{
          gap: 16,
          paddingBottom: 40,
          paddingTop: 16,
          paddingHorizontal: 16,
        }}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps="always"
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
      {/* </KeyboardAwareScrollView> */}
      {/* </KeyboardAvoidingView> */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </Box>
  );
}
