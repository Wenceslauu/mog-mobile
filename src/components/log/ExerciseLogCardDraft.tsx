import { Link } from "expo-router";
import Box from "../Box";
import Text from "../Text";
import { Animated, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import blurhash from "@/constants/blurhash";
import { Theme } from "@/constants/theme";
import { useTheme } from "@shopify/restyle";
import Button from "../Button";
import {
  Controller,
  UseFormSetValue,
  useFieldArray,
  useWatch,
} from "react-hook-form";
import SetLogRowDraft from "./SetLogRowDraft";
import { useActionSheet } from "@/providers/actionSheet";
import * as Haptics from "expo-haptics";
import {
  ExerciseLogDraft,
  SetLogDraft,
  WorkoutLogDraftFormData,
} from "@/types/Log";
import { useEffect, useMemo, useState } from "react";
import TextInput from "../TextInput";
import useLongPressStyle from "@/hooks/useLongPressStyle";
import dayjs from "@/lib/dayjs";

type ExerciseCardDraftProps = {
  control: any;
  exerciseIndex: number;
  setValue: UseFormSetValue<WorkoutLogDraftFormData>;
  handleDeleteExercise: (exerciseIndex: number) => void;
};

export default function ExerciseLogCardDraft({
  control,
  exerciseIndex,
  setValue,
  handleDeleteExercise,
}: ExerciseCardDraftProps) {
  const [editing, setEditing] = useState(false);

  const { colors } = useTheme<Theme>();

  const { openActionSheet } = useActionSheet();
  const { opacity, scale, handlePressIn, handlePressOut } = useLongPressStyle();

  // problema aqui
  const exerciseDraft: ExerciseLogDraft = useWatch({
    control,
    name: `exercises.${exerciseIndex}`,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: `exercises.${exerciseIndex}.sets` as "exercises.0.sets",
  });

  useEffect(() => {
    console.log('fields', fields)
  }, [fields])

  const allSetsFilledOrPreFilled = useMemo(() => {
    return exerciseDraft.sets.every(
      (set: SetLogDraft) =>
        set.weight && (set.reps || set.prescription?.minReps)
    );
  }, [exerciseDraft.sets]);

  const allSetsDone = useMemo(() => {
    return exerciseDraft.sets.every((set: SetLogDraft) => set.done);
  }, [exerciseDraft.sets]);

  const handleAddSet = () => {
    append({
      reps: undefined,
      weight: undefined,
    });
  };

  const handleDeleteSet = (setIndex: number) => {
    remove(setIndex);
  };

  return (
    <Box
      gap="s"
      padding="m"
      paddingBottom="xs"
      backgroundColor="surfaceContainer"
    >
      <Link
        href={{
          pathname: `/exercises/${exerciseDraft.exercise.id}`,
          params: { name: exerciseDraft.exercise.name },
        }}
        asChild
      >
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onLongPress={() => {
            Haptics.selectionAsync();

            openActionSheet([
              {
                name: "Delete Exercise",
                callback: () => {
                  handleDeleteExercise(exerciseIndex);
                },
              },
            ]);
          }}
        >
          <Animated.View
            style={{
              opacity: opacity,
              transform: [{ scale }],
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box gap="s" flexDirection="row" alignItems="center">
              <Image
                source={exerciseDraft.exercise.image}
                placeholder={blurhash}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
              <Box gap="xs">
                <Text variant="title" color="onSurface">
                  {exerciseDraft.exercise.name}
                </Text>
                {exerciseDraft.prescription?.restDuration ? (
                  <Box
                    flexDirection="row"
                    alignItems="center"
                    gap="xs"
                    height={16}
                  >
                    <Ionicons name="timer" size={16} color={colors.primary} />
                    <Text variant="label" color="primary">
                      {dayjs
                        .duration(exerciseDraft.prescription?.restDuration, "s")
                        .format("mm:ss")}
                    </Text>
                  </Box>
                ) : null}
              </Box>
            </Box>
            <Ionicons
              name="chevron-forward"
              size={27}
              color={colors.onSurfaceContainer}
            />
          </Animated.View>
        </Pressable>
      </Link>
      {exerciseDraft.prescription?.authorNotes ? (
        <Box flexDirection="row" alignItems="center" gap="xs">
          <Ionicons name="school" size={16} color={colors.tertiary} />
          <Text variant="label" color="tertiary">
            {exerciseDraft.prescription?.authorNotes}
          </Text>
        </Box>
      ) : null}
      <Pressable onPress={() => setEditing(true)}>
        {({ pressed }) => (
          <Box
            flexDirection="row"
            alignItems="center"
            gap="xs"
            opacity={pressed ? 0.5 : 1}
          >
            <Ionicons name="bulb" size={16} color={colors.secondary} />
            {editing ? (
              <Controller
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    onBlur={() => {
                      setEditing(false);
                      onBlur();
                    }}
                    onChangeText={onChange}
                    value={value}
                    variant="label"
                    color="secondary"
                    autoFocus
                  />
                )}
                name={`exercises.${exerciseIndex}.athleteNotes`}
              />
            ) : (
              <Text variant="label" color="secondary">
                {exerciseDraft.athleteNotes || "Add notes here"}
              </Text>
            )}
            {!editing && (
              <Ionicons
                name="create-outline"
                size={16}
                color={colors.secondary}
              />
            )}
          </Box>
        )}
      </Pressable>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        borderBottomColor="outlineVariant"
        borderBottomWidth={1}
        alignItems="center"
        height={46}
      >
        <Box flex={3}>
          <Text variant="label" color="onSurface">
            Set
          </Text>
        </Box>
        <Box flex={3}>
          <Text variant="label" color="onSurface">
            RPE
          </Text>
        </Box>
        <Box flex={3}>
          <Text variant="label" color="onSurface">
            Target
          </Text>
        </Box>
        <Box flex={2}>
          <Text variant="label" color="onSurface">
            Weight
          </Text>
        </Box>
        <Box flex={2}>
          <Text variant="label" color="onSurface">
            Reps
          </Text>
        </Box>
        <Box flex={1}>
          {allSetsFilledOrPreFilled && (
            <Pressable
              onPress={() => {
                exerciseDraft.sets.forEach(
                  (set: SetLogDraft, index: number) => {
                    if (!set.reps && set.prescription?.minReps)
                      setValue(
                        `exercises.${exerciseIndex}.sets.${index}.reps`,
                        set.prescription.minReps
                      );

                    setValue(
                      `exercises.${exerciseIndex}.sets.${index}.done`,
                      allSetsDone ? false : true
                    );
                  }
                );
              }}
            >
              {({ pressed }) => (
                <Ionicons
                  name={`checkmark-done-circle${allSetsDone ? "" : "-outline"}`}
                  size={28}
                  color={
                    !allSetsDone ? colors.onSurfaceContainer : colors.primary
                  }
                  style={{
                    opacity: pressed ? 0.5 : 1,
                  }}
                />
              )}
            </Pressable>
          )}
        </Box>
      </Box>
      <Box gap="m">
        {fields.map((field, index) => {
          return (
            <SetLogRowDraft
              key={field.id}
              index={index}
              control={control}
              exerciseIndex={exerciseIndex}
              setValue={setValue}
              handleDeleteSet={handleDeleteSet}
            />
          );
        })}
      </Box>
      <Button variant="tertiary" onPress={handleAddSet}>
        Add set
      </Button>
    </Box>
  );
}
