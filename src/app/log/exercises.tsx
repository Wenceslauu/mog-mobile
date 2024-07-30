import Box from "@/components/Box";
import Button from "@/components/Button";
import Text from "@/components/Text";
import ExerciseLogCardDraft from "@/components/log/ExerciseLogCardDraft";
import { Theme } from "@/constants/theme";
import { createRandomWorkoutLogDraft } from "@/helpers/mocks/Log";
import { useOngoingLog } from "@/providers/ongoingLog";
import {
  EnduranceCriteriaEnum,
  ExerciseForceEnum,
  ExerciseSelectionSimple,
} from "@/types/Exercise";
import { ExerciseLogDraft, WorkoutLogDraftFormData } from "@/types/Log";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import {
  Link,
  useGlobalSearchParams,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Platform, Pressable, ScrollView } from "react-native";

const mockedEditionWorkoutLog = createRandomWorkoutLogDraft("edition");

export default function LogExercisesScreen() {
  const { workoutLog, setWorkoutLog, resetWorkoutLog } = useOngoingLog();

  const { id } = useGlobalSearchParams();

  const { selectedExercises } = useLocalSearchParams();

  const { control, setValue, reset, watch, getValues } =
    useForm<WorkoutLogDraftFormData>({
      defaultValues: {
        exercises: workoutLog.exercises,
      },
    });

  useEffect(() => {
    if (id) {
      setWorkoutLog(mockedEditionWorkoutLog);

      reset({
        exercises: mockedEditionWorkoutLog.exercises,
      });
    }
  }, []);

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

      setWorkoutLog((draft) => {
        draft.exercises.push(...newExercises);
      });
    }
  }, [selectedExercises]);

  const handleDeleteExercise = (exerciseIndex: number) => {
    remove(exerciseIndex);

    setWorkoutLog((draft) => {
      delete draft.exercises[exerciseIndex];
    });
  };

  const { colors } = useTheme<Theme>();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Link
          href={{
            pathname: "/log/post",
          }}
          asChild
        >
          <Pressable>
            {({ pressed }) => (
              <Ionicons
                name="american-football"
                size={25}
                color={colors.onSurfaceContainer}
                style={{ marginRight: 11, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </Link>
      ),
    });
  }, [navigation, colors]);

  const onBeforeRemove = useCallback(() => {
    if (id) {
      resetWorkoutLog();
    }
  }, []);

  useEffect(() => {
    navigation.addListener("beforeRemove", onBeforeRemove);

    return () => {
      navigation.removeListener("beforeRemove", onBeforeRemove);
    };
  }, []);

  return (
    <Box flex={1} paddingTop="m" backgroundColor="surface">
      <Box paddingHorizontal="m">
        <Text variant="title" color="onSurface">
          {workoutLog.workout?.name}
        </Text>
      </Box>
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
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </Box>
  );
}
