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
import { Controller, useFieldArray, useWatch } from "react-hook-form";
import SetRowDraft from "./SetRowDraft";
import { useActionSheet } from "@/providers/actionSheet";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import TextInput from "../TextInput";
import useLongPressStyle from "@/hooks/useLongPressStyle";

type ExerciseCardDraftProps = {
  control: any;
  exerciseIndex: number;
  handleDeleteExercise: (exerciseIndex: number) => void;
};

export default function ExerciseCardDraft({
  control,
  exerciseIndex,
  handleDeleteExercise,
}: ExerciseCardDraftProps) {
  const [editing, setEditing] = useState(false);

  const { colors } = useTheme<Theme>();

  const { openActionSheet } = useActionSheet();
  const { opacity, scale, handlePressIn, handlePressOut } = useLongPressStyle();

  const exerciseDraft = useWatch({
    control,
    name: `exercises.${exerciseIndex}`,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: `exercises.${exerciseIndex}.sets` as "exercises.0.sets",
  });

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
            />
          </Animated.View>
        </Pressable>
      </Link>
      <Pressable onPress={() => setEditing(true)}>
        {({ pressed }) => (
          <Box
            flexDirection="row"
            alignItems="center"
            gap="xs"
            opacity={pressed ? 0.5 : 1}
          >
            <Ionicons name="school" size={16} color={colors.tertiary} />
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
                    color="tertiary"
                    autoFocus
                  />
                )}
                name={`exercises.${exerciseIndex}.authorNotes`}
              />
            ) : (
              <Text variant="label" color="tertiary">
                {exerciseDraft.authorNotes || "Add notes here"}
              </Text>
            )}
            {!editing && (
              <Ionicons
                name="create-outline"
                size={16}
                color={colors.tertiary}
              />
            )}
          </Box>
        )}
      </Pressable>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        borderBottomColor="outlineVariant"
        paddingVertical="s"
        borderBottomWidth={1}
      >
        <Box flex={2}>
          <Text variant="label" color="onSurface">
            Set
          </Text>
        </Box>
        <Box flex={2}>
          <Text variant="label" color="onSurface">
            Reps
          </Text>
        </Box>
        <Box flex={1}>
          <Text variant="label" color="onSurface">
            RPE
          </Text>
        </Box>
      </Box>
      <Box gap="m">
        {fields.map((field, index) => {
          return (
            <SetRowDraft
              key={field.id}
              index={index}
              control={control}
              exerciseIndex={exerciseIndex}
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
