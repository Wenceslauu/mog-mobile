import { Dispatch, SetStateAction } from "react";
import Box from "./Box";
import Text from "./Text";
import { Pressable } from "react-native";

type SelectOption<T> = {
  label: string;
  value: T;
};

type CheckboxGroupProps<T> = {
  mode: "single" | "multiple";
  selected: T | T[] | null;
  handleSelect:
    | ((newValue: T | T[] | null) => void)
    | Dispatch<SetStateAction<T | T[] | null>>;
  options: SelectOption<T>[];
};

export default function CheckboxGroup<T>({
  selected,
  handleSelect,
  options,
  mode,
}: CheckboxGroupProps<T>) {
  return (
    <Box flexDirection="row" flexWrap="wrap" gap="s">
      {options.map((option, index) => {
        if (mode === "single") {
          return (
            <Checkbox
              key={index}
              label={option.label}
              checked={selected === option.value}
              handleCheck={() => {
                if (selected == null) {
                  handleSelect(option.value);
                } else {
                  if (selected === option.value) {
                    handleSelect(null);
                  } else {
                    handleSelect(option.value);
                  }
                }
              }}
            />
          );
        } else if (mode === "multiple" && Array.isArray(selected)) {
          return (
            <Checkbox
              key={index}
              label={option.label}
              checked={selected ? selected.includes(option.value) : false}
              handleCheck={() => {
                if (selected == null) {
                  handleSelect([option.value]);
                } else {
                  if (selected.includes(option.value)) {
                    handleSelect(selected.filter((v) => v !== option.value));
                  } else {
                    handleSelect([...selected, option.value]);
                  }
                }
              }}
            />
          );
        }
      })}
    </Box>
  );
}

function Checkbox({
  label,
  checked,
  handleCheck,
}: {
  label: string;
  checked: boolean;
  handleCheck: () => void;
}) {
  return (
    <Pressable onPress={handleCheck}>
      {({ pressed }) => (
        <Box
          padding="m"
          borderRadius="s"
          opacity={pressed ? 0.5 : 1}
          backgroundColor={checked ? "secondaryContainer" : "surfaceContainer"}
        >
          <Text
            variant="body"
            color={checked ? "onSecondaryContainer" : "onSurfaceContainer"}
          >
            {label}
          </Text>
        </Box>
      )}
    </Pressable>
  );
}
