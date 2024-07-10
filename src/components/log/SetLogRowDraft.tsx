import { Controller, UseFormSetValue, useWatch } from "react-hook-form";
import Box from "../Box";
import Text from "../Text";
import TextInput from "../TextInput";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";
import { useEffect, useMemo, useRef } from "react";
import { Animated, Pressable, TextInput as RNTextInput } from "react-native";
import { useActionSheet } from "@/providers/actionSheet";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { SetLogDraft, WorkoutLogDraftFormData } from "@/types/Log";
import useLongPressStyle from "@/hooks/useLongPressStyle";
import { EnduranceCriteriaEnum, IntensityCriteriaEnum } from "@/types/Exercise";
import dayjs from "@/lib/dayjs";
import Modal from "../Modal";
import DurationPickerModalContent from "../DurationPickerModalContent";
import useModal from "@/hooks/useModal";

type SetRowDraftProps = {
  control: any;
  index: number;
  exerciseIndex: number;
  prescribedIntensityCriteria?: IntensityCriteriaEnum;
  prescribedEnduranceCriteria?: EnduranceCriteriaEnum;
  enduranceCriteria: EnduranceCriteriaEnum.Reps | EnduranceCriteriaEnum.Time;
  setValue: UseFormSetValue<WorkoutLogDraftFormData>;
  handleDeleteSet: (setIndex: number) => void;
};

export default function SetLogRowDraft({
  control,
  index,
  exerciseIndex,
  prescribedIntensityCriteria,
  prescribedEnduranceCriteria,
  enduranceCriteria,
  setValue,
  handleDeleteSet,
}: SetRowDraftProps) {
  const { colors } = useTheme<Theme>();

  const { openActionSheet } = useActionSheet();
  const { scale, handlePressIn, handlePressOut } = useLongPressStyle();

  const repsInputRef = useRef<RNTextInput | null>(null);
  const rpeInputRef = useRef<RNTextInput | null>(null);

  const setDraft: SetLogDraft = useWatch({
    control,
    name: `exercises.${exerciseIndex}.sets.${index}`,
  });

  const setTargetTime: number = useWatch({
    control,
    name: `exercises.${exerciseIndex}.sets.${index}.targetTime`,
  });

  const setPreFilled = useMemo(() => {
    return setDraft.prescription?.minReps && setDraft.weight;
  }, [setDraft]);

  const setFilled = useMemo(() => {
    return setDraft.reps && setDraft.weight;
  }, [setDraft]);

  const { isOpen, isOpenAnimated, toggleModal } = useModal();

  useEffect(() => {
    if (!setFilled) {
      setValue(`exercises.${exerciseIndex}.sets.${index}.done`, false);
    }
  }, [setFilled]);

  return (
    <>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onLongPress={() => {
          Haptics.selectionAsync();

          openActionSheet([
            {
              name: "Delete Set",
              callback: () => {
                handleDeleteSet(index);
              },
              isDisabled: !setDraft.isFreestyle,
              disabledText: "Cannot delete original sets",
            },
          ]);
        }}
      >
        <Animated.View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            transform: [
              {
                scale,
              },
            ],
          }}
        >
          <Box flex={3}>
            <Text variant="body" color="onSurfaceContainer">
              {index + 1}
            </Text>
          </Box>
          <Box flex={3}>
            <Text variant="body" color="onSurface">
              {renderIntensity(setDraft, prescribedIntensityCriteria)}
            </Text>
          </Box>
          <Box flex={3}>
            <Text variant="body" color="onSurface">
              {renderEndurance(setDraft, prescribedEnduranceCriteria)}
            </Text>
          </Box>
          <Box flex={2}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  // https://stackoverflow.com/a/71497701
                  ref={repsInputRef}
                  onBlur={onBlur}
                  onFocus={() => {
                    repsInputRef.current?.setNativeProps({
                      selection: { start: 0, end: value?.toString().length },
                    });
                  }}
                  onChangeText={(text) => {
                    // Avoid displaying 0 when input is empty: "" -> Number("") -> 0 -> String(0) -> "0"
                    if (text === "") {
                      onChange(undefined);
                      return;
                    }
                    onChange(Number(text));
                  }}
                  value={(() => {
                    if (value === undefined) {
                      return;
                    }
                    return String(value);
                  })()}
                  selectTextOnFocus
                  returnKeyType="done"
                  inputMode="numeric"
                  maxLength={4}
                  backgroundColor="secondaryContainer"
                  width={40}
                  borderRadius="xs"
                  padding="xs"
                  color="onSecondaryContainer"
                  selectionColor={colors.primary}
                  textAlign="center"
                />
              )}
              name={`exercises.${exerciseIndex}.sets.${index}.weight`}
            />
          </Box>
          <Box flex={2}>
            {enduranceCriteria !== EnduranceCriteriaEnum.Time ? (
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    // https://stackoverflow.com/a/71497701
                    ref={rpeInputRef}
                    onBlur={onBlur}
                    onFocus={() => {
                      rpeInputRef.current?.setNativeProps({
                        selection: { start: 0, end: value?.toString().length },
                      });
                    }}
                    onChangeText={(text) => {
                      // Avoid displaying 0 when input is empty: "" -> Number("") -> 0 -> String(0) -> "0"
                      if (text === "") {
                        onChange(undefined);
                        return;
                      }
                      onChange(Number(text));
                    }}
                    value={(() => {
                      if (value === undefined) {
                        return value;
                      }
                      return String(value);
                    })()}
                    selectTextOnFocus
                    returnKeyType="done"
                    inputMode="numeric"
                    maxLength={3}
                    backgroundColor="secondaryContainer"
                    width={40}
                    borderRadius="xs"
                    padding="xs"
                    color="onSecondaryContainer"
                    selectionColor={colors.primary}
                    textAlign="center"
                    placeholder={
                      setDraft.prescription?.minReps
                        ? String(setDraft.prescription?.minReps)
                        : ""
                    }
                  />
                )}
                name={`exercises.${exerciseIndex}.sets.${index}.reps`}
              />
            ) : (
              <Pressable onPress={toggleModal}>
                <Box
                  backgroundColor="secondaryContainer"
                  borderRadius="xs"
                  padding="xs"
                >
                  <Text color="onSecondaryContainer">
                    {dayjs.duration(setTargetTime ?? 0, "s").format("mm:ss")}
                  </Text>
                </Box>
              </Pressable>
            )}
          </Box>
          <Box flex={1}>
            <Controller
              control={control}
              render={({ field: { value } }) => (
                <Pressable
                  onPress={() => {
                    if (!setDraft.reps && setDraft.prescription?.minReps) {
                      setValue(
                        `exercises.${exerciseIndex}.sets.${index}.reps`,
                        setDraft.prescription.minReps
                      );
                    }

                    setValue(
                      `exercises.${exerciseIndex}.sets.${index}.done`,
                      value ? !value : true
                    );
                  }}
                  disabled={!setPreFilled && !setFilled}
                  style={{ opacity: !setPreFilled && !setFilled ? 0.5 : 1 }}
                >
                  {({ pressed }) => (
                    <Ionicons
                      name={`checkmark-circle${
                        setFilled && value ? "" : "-outline"
                      }`}
                      size={28}
                      color={
                        setFilled && value
                          ? colors.primary
                          : colors.onSurfaceContainer
                      }
                      style={{ opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              )}
              name={`exercises.${exerciseIndex}.sets.${index}.done`}
            />
          </Box>
        </Animated.View>
      </Pressable>
      {/* TODO: modal on every set? */}
      <Modal
        title="Change target time"
        isOpen={isOpen}
        isOpenAnimated={isOpenAnimated}
        toggleModal={toggleModal}
        contentComponent={() => (
          <DurationPickerModalContent
            control={control}
            exerciseIndex={exerciseIndex}
            setIndex={index}
          />
        )}
      />
    </>
  );
}

const renderEndurance = (
  set: SetLogDraft,
  enduranceCriteria?: EnduranceCriteriaEnum
) => {
  if (!set.prescription) {
    return "-";
  }

  switch (enduranceCriteria) {
    case EnduranceCriteriaEnum.Reps:
      return `${set.prescription.minReps} reps`;
    case EnduranceCriteriaEnum["Reps Range"]:
      return `${set.prescription.minReps} - ${set.prescription.maxReps} reps`;
    case EnduranceCriteriaEnum.Time:
      return dayjs
        .duration(set.prescription.targetTime ?? 0, "s")
        .format("mm:ss");
    case EnduranceCriteriaEnum.AMRAP:
      return "AMRAP";
    default:
      return null;
  }
};

const renderIntensity = (
  set: SetLogDraft,
  intensityCriteria?: IntensityCriteriaEnum
) => {
  if (!set.prescription) {
    return "-";
  }

  switch (intensityCriteria) {
    case IntensityCriteriaEnum.RPE:
      return `RPE ${set.prescription.rpe}`;
    case IntensityCriteriaEnum["% of 1RM"]:
      return `${set.prescription.prPercentage}%`;
    default:
      return null;
  }
};
