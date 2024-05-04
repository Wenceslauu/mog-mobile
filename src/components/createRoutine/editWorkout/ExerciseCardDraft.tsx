import { Link } from "expo-router";
import Box from "../../Box";
import Text from "../../Text";
import { Animated, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import blurhash from "@/constants/blurhash";
import { Theme } from "@/constants/theme";
import { useTheme } from "@shopify/restyle";
import Button from "../../Button";
import { Control, Controller, useFieldArray, useWatch } from "react-hook-form";
import SetRowDraft from "./SetRowDraft";
import { useActionSheet } from "@/providers/actionSheet";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import TextInput from "../../TextInput";
import useLongPressStyle from "@/hooks/useLongPressStyle";
import dayjs from "@/lib/dayjs";
import {
  WorkoutDraftFormData,
  WorkoutExerciseDraftFormData,
} from "@/types/Routine";
import {
  EnduranceCriteriaEnum,
  ExerciseForceEnum,
  IntensityCriteriaEnum,
} from "@/types/Exercise";
import FilterDropdown from "@/components/FilterDropdown";
import generateDropdownOptionsFromEnum from "@/helpers/generateDropdownOptionsFromEnum";
import { TimerPicker } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient";
import useModal from "@/hooks/useModal";
import Modal from "@/components/Modal";

type ExerciseCardDraftProps = {
  control: Control<WorkoutDraftFormData, any>;
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

  const exerciseDraft: WorkoutExerciseDraftFormData = useWatch({
    control,
    name: `exercises.${exerciseIndex}`,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: `exercises.${exerciseIndex}.sets` as "exercises.0.sets",
  });

  const [enduranceCriteria, setEnduranceCriteria] =
    useState<EnduranceCriteriaEnum | null>(
      exerciseDraft.exercise.force === ExerciseForceEnum.Isometric
        ? EnduranceCriteriaEnum.Time
        : EnduranceCriteriaEnum.Reps
    );

  const [intensityCriteria, setIntensityCriteria] =
    useState<IntensityCriteriaEnum | null>(IntensityCriteriaEnum.RPE);

  const handleAddSet = () => {
    append({
      minReps: undefined,
      rpe: undefined,
      isWarmup: false,
    });
  };

  const handleDeleteSet = (setIndex: number) => {
    remove(setIndex);
  };

  const { isOpen, isOpenAnimated, toggleModal } = useModal();

  return (
    <>
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
                  {exerciseDraft.restDuration ? (
                    <Pressable onPress={toggleModal}>
                      {({ pressed }) => (
                        <Box
                          flexDirection="row"
                          alignItems="center"
                          gap="xs"
                          height={16}
                          opacity={pressed ? 0.5 : 1}
                        >
                          <Ionicons
                            name="timer"
                            size={16}
                            color={colors.primary}
                          />
                          <Text variant="label" color="primary">
                            {dayjs
                              .duration(
                                exerciseDraft.restDuration as number,
                                "s"
                              )
                              .format("mm:ss")}
                          </Text>
                          <Ionicons
                            name="create-outline"
                            size={16}
                            color={colors.primary}
                          />
                        </Box>
                      )}
                    </Pressable>
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
          <Box width="30%" alignItems="flex-start">
            <Text variant="label" color="onSurface">
              Set
            </Text>
          </Box>
          <Box width="40%" alignItems="flex-start">
            <Box>
              <FilterDropdown
                type="normal"
                name="Endurance"
                selected={enduranceCriteria}
                setSelected={setEnduranceCriteria}
                options={generateDropdownOptionsFromEnum<
                  typeof EnduranceCriteriaEnum
                >(EnduranceCriteriaEnum)}
              />
            </Box>
          </Box>
          <Box width="30%" alignItems="flex-start">
            <Box>
              <FilterDropdown
                type="normal"
                name="Intensity"
                selected={intensityCriteria}
                setSelected={setIntensityCriteria}
                options={generateDropdownOptionsFromEnum<
                  typeof IntensityCriteriaEnum
                >(IntensityCriteriaEnum)}
              />
            </Box>
          </Box>
        </Box>
        <Box gap="m">
          {fields.map((field, index) => {
            return (
              <SetRowDraft
                key={field.id}
                index={index}
                control={control}
                enduranceCriteria={enduranceCriteria as EnduranceCriteriaEnum}
                intensityCriteria={intensityCriteria as IntensityCriteriaEnum}
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
      <Modal
        title="Change rest duration"
        isOpen={isOpen}
        isOpenAnimated={isOpenAnimated}
        toggleModal={toggleModal}
        contentComponent={() => (
          <DurationPickerModalContent
            exerciseIndex={exerciseIndex}
            control={control}
          />
        )}
      />
    </>
  );
}

type DurationPickerModalProps = {
  exerciseIndex: number;
  control: Control<WorkoutDraftFormData, any>;
};

function DurationPickerModalContent({
  exerciseIndex,
  control,
}: DurationPickerModalProps) {
  const { colors } = useTheme<Theme>();

  return (
    <Box alignItems="center">
      <Controller
        control={control}
        render={({ field: { value, onChange } }) => (
          <TimerPicker
            initialMinutes={value ? Math.floor(value / 60) : 0}
            initialSeconds={value ? value % 60 : 0}
            onDurationChange={(duration) => {
              onChange(duration.minutes * 60 + duration.seconds);
            }}
            hideHours
            minuteLabel="min"
            secondLabel="sec"
            LinearGradient={LinearGradient}
            styles={{
              theme: "dark",
              backgroundColor: colors.surfaceContainer,
              text: {
                color: colors.onSurfaceContainer,
              },
              pickerLabel: {
                right: -12,
              },
            }}
          />
        )}
        name={`exercises.${exerciseIndex}.restDuration`}
      />
    </Box>
  );
}
