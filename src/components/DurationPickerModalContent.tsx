import { Control, Controller } from "react-hook-form";
import Box from "./Box";
import { TimerPicker } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";
import { WorkoutDraftFormData } from "@/types/Routine";

type DurationPickerModalProps = {
  name: any;
  control: Control<WorkoutDraftFormData, any>;
  customOnChange?: (duration: {
    hours: number;
    minutes: number;
    seconds: number;
  }) => void;
};

export default function DurationPickerModalContent({
  name,
  control,
  customOnChange,
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
              if (customOnChange) customOnChange(duration);
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
        name={name}
      />
    </Box>
  );
}
