import Box from "@/components/Box";
import Button from "@/components/Button";
import Text from "@/components/Text";
import ExerciseLogCardDraft from "@/components/log/ExerciseLogCardDraft";
import { WorkoutLogDraftFormData } from "@/types/WorkoutLog";
import { Link, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const mockedWorkout = {
  name: "Upper",
  exercises: [
    {
      id: 1,
      name: "Bench Press",
      image: "https://source.unsplash.com/random",
      authorNotes: "Arch you back!",
      athleteNotes: "I felt a bit of pain in my shoulder",
      restDuration: 60,
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
    // TODO: Appending exercises every time the page loads is not ideal, it should be done only once
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
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : undefined}
      > */}
      {/* <KeyboardAwareScrollView
        contentContainerStyle={{
          gap: 16,
          paddingBottom: 30,
        }}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
      > */}
      <ScrollView
        contentContainerStyle={{
          gap: 16,
          paddingBottom: 30,
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
