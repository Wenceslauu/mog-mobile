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
  const { scale, handlePressIn, handlePressOut } = useLongPressStyle();

  const repsInputRef = useRef<RNTextInput | null>(null);
  const rpeInputRef = useRef<RNTextInput | null>(null);

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
        <Box flex={2}>
          <Text variant="body" color="onSurfaceContainer">
            {index + 1}
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
        </Box>
        <Box flex={1}>
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
        </Box>
      </Animated.View>
    </Pressable>
  );
}
