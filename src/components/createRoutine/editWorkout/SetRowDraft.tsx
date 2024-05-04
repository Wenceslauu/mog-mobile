import { Controller } from "react-hook-form";
import Box from "../../Box";
import Text from "../../Text";
import TextInput from "../../TextInput";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";
import { useRef } from "react";
import { Animated, Pressable, TextInput as RNTextInput } from "react-native";
import { useActionSheet } from "@/providers/actionSheet";
import * as Haptics from "expo-haptics";
import useLongPressStyle from "@/hooks/useLongPressStyle";
import { EnduranceCriteriaEnum, IntensityCriteriaEnum } from "@/types/Exercise";

type SetRowDraftProps = {
  control: any;
  index: number;
  exerciseIndex: number;
  enduranceCriteria: EnduranceCriteriaEnum;
  intensityCriteria: IntensityCriteriaEnum;
  handleDeleteSet: (setIndex: number) => void;
};

export default function SetRowDraft({
  control,
  index,
  exerciseIndex,
  handleDeleteSet,
  enduranceCriteria,
  intensityCriteria,
}: SetRowDraftProps) {
  const { colors } = useTheme<Theme>();

  const { openActionSheet } = useActionSheet();
  const { scale, handlePressIn, handlePressOut } = useLongPressStyle();

  const minRepsInputRef = useRef<RNTextInput | null>(null);
  const maxRepsInputRef = useRef<RNTextInput | null>(null);

  const rpeInputRef = useRef<RNTextInput | null>(null);
  const prPercentageInputRef = useRef<RNTextInput | null>(null);

  return (
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
        <Box width="30%">
          <Text variant="body" color="onSurfaceContainer">
            {index + 1}
          </Text>
        </Box>
        <Box width="40%" alignItems="center" flexDirection="row" gap="xs">
          {(enduranceCriteria === EnduranceCriteriaEnum.Reps ||
            enduranceCriteria === EnduranceCriteriaEnum["Reps Range"]) && (
            <>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    // https://stackoverflow.com/a/71497701
                    ref={minRepsInputRef}
                    onBlur={onBlur}
                    onFocus={() => {
                      minRepsInputRef.current?.setNativeProps({
                        selection: {
                          start: 0,
                          end: value?.toString().length,
                        },
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
                    maxLength={3}
                    backgroundColor="secondaryContainer"
                    width={40}
                    borderRadius="xs"
                    padding="xs"
                    color="onSecondaryContainer"
                    selectionColor={colors.primary}
                    textAlign="center"
                  />
                )}
                name={`exercises.${exerciseIndex}.sets.${index}.minReps`}
              />
              {enduranceCriteria === EnduranceCriteriaEnum["Reps Range"] && (
                <>
                  <Text color="onSurface">-</Text>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        // https://stackoverflow.com/a/71497701
                        ref={maxRepsInputRef}
                        onBlur={onBlur}
                        onFocus={() => {
                          maxRepsInputRef.current?.setNativeProps({
                            selection: {
                              start: 0,
                              end: value?.toString().length,
                            },
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
                        maxLength={3}
                        backgroundColor="secondaryContainer"
                        width={40}
                        borderRadius="xs"
                        padding="xs"
                        color="onSecondaryContainer"
                        selectionColor={colors.primary}
                        textAlign="center"
                      />
                    )}
                    name={`exercises.${exerciseIndex}.sets.${index}.maxReps`}
                  />
                </>
              )}
            </>
          )}
          {enduranceCriteria === EnduranceCriteriaEnum.AMRAP && (
            <Text color="onSurface">AMRAP</Text>
          )}
          {enduranceCriteria === EnduranceCriteriaEnum.Time && (
            <Text color="onSurface">Time</Text>
          )}
        </Box>
        <Box width="30%">
          {intensityCriteria === IntensityCriteriaEnum.RPE && (
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
                  maxLength={1}
                  backgroundColor="secondaryContainer"
                  width={40}
                  borderRadius="xs"
                  padding="xs"
                  color="onSecondaryContainer"
                  selectionColor={colors.primary}
                  textAlign="center"
                />
              )}
              name={`exercises.${exerciseIndex}.sets.${index}.rpe`}
            />
          )}
          {intensityCriteria === IntensityCriteriaEnum["% of 1RM"] && (
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  // https://stackoverflow.com/a/71497701
                  ref={prPercentageInputRef}
                  onBlur={onBlur}
                  onFocus={() => {
                    prPercentageInputRef.current?.setNativeProps({
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
                  maxLength={1}
                  backgroundColor="secondaryContainer"
                  width={40}
                  borderRadius="xs"
                  padding="xs"
                  color="onSecondaryContainer"
                  selectionColor={colors.primary}
                  textAlign="center"
                />
              )}
              name={`exercises.${exerciseIndex}.sets.${index}.prPercentage`}
            />
          )}
        </Box>
      </Animated.View>
    </Pressable>
  );
}
