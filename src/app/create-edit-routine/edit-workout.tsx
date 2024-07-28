import Box from "@/components/Box";
import Button from "@/components/Button";
import ExerciseCardDraft from "@/components/createRoutine/editWorkout/ExerciseCardDraft";
import { useCreateRoutine } from "@/providers/createRoutine";
import {
  EnduranceCriteriaEnum,
  ExerciseForceEnum,
  ExerciseSelectionSimple,
  IntensityCriteriaEnum,
} from "@/types/Exercise";
import {
  WorkoutDraftFormData,
  WorkoutExerciseDraft,
  WorkoutExerciseDraftFormData,
} from "@/types/Routine";
import { faker } from "@faker-js/faker";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Animated } from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";

export default function EditWorkoutScreen() {
  const { routine, setRoutine, isDirty } = useCreateRoutine();

  const { cycleIndex, workoutIndex, selectedExercises } =
    useLocalSearchParams();

  // We need to cache the indexes to avoid losing them when the user navigates back from the add-exercises screen
  // That would not be necessary if expo router had an option to merge params
  // TODO: Maybe useRef here?
  const [cachedIndexes] = useState({
    cycleIndex,
    workoutIndex,
  });

  const draggableScale = useRef(new Animated.Value(1)).current;
  const highlightDraggableItem = () => {
    Animated.timing(draggableScale, {
      toValue: 1.03,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const stopDragging = () => {
    Animated.timing(draggableScale, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const { control, handleSubmit } = useForm<WorkoutDraftFormData>({
    defaultValues: {
      exercises:
        routine.cycles[Number(cachedIndexes.cycleIndex)].workouts[
          Number(cachedIndexes.workoutIndex)
        ].exercises,
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "exercises",
  });

  useEffect(() => {
    // TODO: Appending exercises every time the page loads is not ideal, it should be done only once
    if (selectedExercises) {
      const parsedSelectedExercises: ExerciseSelectionSimple[] = JSON.parse(
        selectedExercises as string
      );

      const newExercises: WorkoutExerciseDraftFormData[] =
        parsedSelectedExercises.map((selectedExercise) => {
          return {
            // TODO: generate a random id
            id: faker.string.uuid(),
            exercise: selectedExercise,
            intensityCriteria: IntensityCriteriaEnum.RPE,
            enduranceCriteria:
              selectedExercise.force === ExerciseForceEnum.Isometric
                ? EnduranceCriteriaEnum.Time
                : EnduranceCriteriaEnum.Reps,
            restDuration: 90,

            sets: [
              {
                isWarmup: false,
              },
            ],
          };
        });

      append(newExercises);
    }
  }, [selectedExercises]);

  const onSubmit = handleSubmit((data) => {
    setRoutine((draft) => {
      draft.cycles[Number(cachedIndexes.cycleIndex)].workouts[
        Number(cachedIndexes.workoutIndex)
      ].exercises = data.exercises;
    });

    isDirty.current = true;

    router.back();
  });

  const handleDeleteExercise = (exerciseIndex: number) => {
    remove(exerciseIndex);
  };

  const handleReorderExercises = (from: number, to: number) => {
    move(from, to);
  };

  return (
    <Box flex={1} paddingTop="m" backgroundColor="surface">
      <DraggableFlatList
        data={fields}
        keyExtractor={(item) => item.id}
        renderItem={({ getIndex, drag, isActive }) => (
          <>
            <ScaleDecorator activeScale={1.03}>
              <ExerciseCardDraft
                exerciseIndex={getIndex() as number}
                control={control}
                handleDeleteExercise={handleDeleteExercise}
                drag={drag}
                isActive={isActive}
                draggableScale={draggableScale}
                highlightDraggableItem={highlightDraggableItem}
              />
            </ScaleDecorator>
            <Box height={16} />
          </>
        )}
        onDragEnd={({ from, to }) => {
          handleReorderExercises(from, to);
        }}
        onRelease={stopDragging}
        contentContainerStyle={{
          paddingBottom: 32,
          paddingHorizontal: 16,
        }}
        containerStyle={{
          flex: 1,
        }}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        ListFooterComponent={() => (
          <Link
            href={{
              pathname: "/add-exercises",
              params: {
                pathBack: "/create-edit-routine/edit-workout",
              },
            }}
            asChild
          >
            <Button variant="secondary">Add exercise</Button>
          </Link>
        )}
      />
      <Box
        backgroundColor="surfaceContainer"
        paddingHorizontal="m"
        paddingVertical="s"
        paddingBottom="l"
      >
        <Button variant="primary" onPress={onSubmit}>
          Save and go back
        </Button>
      </Box>
    </Box>
  );
}
