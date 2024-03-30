import { Link } from "expo-router";
import Box from "../Box";
import Text from "../Text";
import { Pressable } from "react-native";
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
import SetRowLogDraft from "./SetRowLogDraft";
import { useActionSheet } from "@/providers/actionSheet";
import * as Haptics from "expo-haptics";
import { SetLogDraft, WorkoutLogDraftFormData } from "@/types/WorkoutLog";
import { useMemo, useState } from "react";
import TextInput from "../TextInput";

type ExerciseCardDraftProps = {
  control: any;
  exerciseIndex: number;
  setValue: UseFormSetValue<WorkoutLogDraftFormData>;
  handleDeleteExercise: (exerciseIndex: number) => void;
};

export default function ExerciseCardDraft({
  control,
  exerciseIndex,
  setValue,
  handleDeleteExercise,
}: ExerciseCardDraftProps) {
  const [editing, setEditing] = useState(false);

  const { colors } = useTheme<Theme>();

  const { openActionSheet } = useActionSheet();

  const exerciseDraft = useWatch({
    control,
    name: `exercises.${exerciseIndex}`,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: `exercises.${exerciseIndex}.sets` as "exercises.0.sets",
  });

  const allSetsFilled = useMemo(() => {
    return exerciseDraft.sets.every(
      (set: SetLogDraft) => set.reps && set.weight
    );
  }, [exerciseDraft.sets]);

  const allSetsDone = useMemo(() => {
    return exerciseDraft.sets.every((set: SetLogDraft) => set.done);
  }, [exerciseDraft.sets]);

  const handleAddSet = () => {
    append({
      reps: undefined,
      intensity: undefined,
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
          pathname: `/exercises/${exerciseDraft.id}`,
          params: { name: exerciseDraft.name },
        }}
        asChild
      >
        <Pressable
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
          {({ pressed }) => (
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                gap="s"
                flexDirection="row"
                alignItems="center"
                opacity={pressed ? 0.5 : 1}
              >
                <Image
                  source={exerciseDraft.image}
                  placeholder={blurhash}
                  style={{
                    width: 50,
                    height: 50,
                  }}
                />
                <Text variant="title" color="onSurface">
                  {exerciseDraft.name}
                </Text>
              </Box>
              <Ionicons
                name="chevron-forward"
                size={27}
                color={colors.onSurfaceContainer}
                style={{ opacity: pressed ? 0.5 : 1 }}
              />
            </Box>
          )}
        </Pressable>
      </Link>
      {exerciseDraft.authorNotes && (
        <Box flexDirection="row" alignItems="center" gap="xs">
          <Ionicons name="school" size={16} color={colors.tertiary} />
          <Text variant="label" color="tertiary">
            {exerciseDraft.authorNotes}
          </Text>
        </Box>
      )}
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
          {allSetsFilled && (
            <Pressable
              onPress={() => {
                exerciseDraft.sets.forEach((_: unknown, index: number) => {
                  setValue(
                    `exercises.${exerciseIndex}.sets.${index}.done`,
                    allSetsDone ? false : true
                  );
                });
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
            <SetRowLogDraft
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
