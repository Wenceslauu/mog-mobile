import { Controller, useWatch } from "react-hook-form";
import Box from "../Box";
import Text from "../Text";
import TextInput from "../TextInput";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";
import { useRef } from "react";
import { Pressable, TextInput as RNTextInput } from "react-native";
import { useActionSheet } from "@/providers/actionSheet";
import * as Haptics from "expo-haptics";

type SetRowDraftProps = {
  control: any;
  index: number;
  exerciseIndex: number;
  handleDeleteSet: (setIndex: number) => void;
};

export default function SetRowDraft({
  control,
  index,
  exerciseIndex,
  handleDeleteSet,
}: SetRowDraftProps) {
  const { colors } = useTheme<Theme>();

  const { openActionSheet } = useActionSheet();

  const repsInputRef = useRef<RNTextInput | null>(null);
  const rpeInputRef = useRef<RNTextInput | null>(null);

  const setDraft = useWatch({
    control,
    name: `exercises.${exerciseIndex}.sets.${index}`,
  });

  return (
    <Pressable
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
      {({ pressed }) => (
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          opacity={pressed ? 0.5 : 1}
        >
          <Box flex={3}>
            <Text variant="body" color="onSurfaceContainer">
              {index + 1}
            </Text>
          </Box>
          <Box flex={3}>
            <Text variant="body" color="onSurface">
              {setDraft.targetIntensity ?? "-"}
            </Text>
          </Box>
          <Box flex={3}>
            <Text variant="body" color="onSurface">
              {setDraft.targetReps ? `${setDraft.targetReps} reps` : "-"}
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
                />
              )}
              name={`exercises.${exerciseIndex}.sets.${index}.reps`}
            />
          </Box>
        </Box>
      )}
    </Pressable>
  );
}
