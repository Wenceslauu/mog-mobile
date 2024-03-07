import Box from "@/components/Box";
import Button from "@/components/Button";
import Text from "@/components/Text";
import { Theme } from "@/constants/theme";
import { CreateRoutineContext } from "@/contexts/createRoutine";
import { useTheme } from "@shopify/restyle";
import { router } from "expo-router";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native";

type FormData = {
  name: string;
  description: string;
};

export default function CreateRoutineScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { setRoutine } = useContext(CreateRoutineContext);

  const { colors } = useTheme<Theme>();

  const onSubmit = handleSubmit((data) => {
    // TODO: Submit data to the context to keep the wizard form state
    setRoutine((prevRoutine: any) => ({
      ...prevRoutine,
      ...data,
    }));

    router.push("/create-routine/createCycles")
  });

  return (
    <Box
      flex={1}
      paddingTop="m"
      paddingHorizontal="m"
      backgroundColor="surface"
    >
      <Box flex={1} gap="l">
        <Box gap="m">
          <Text variant="label" color="onSurface">
            Name
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Routine name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                selectionColor={colors.primary}
                style={{
                  flex: 1,
                  height: 50,
                  padding: 10,
                  paddingLeft: 40,
                  color: colors.onSurface,
                }}
              />
            )}
            name="name"
          />
          {errors.name && <Text>This is required.</Text>}
        </Box>
        <Box gap="m">
          <Text variant="label" color="onSurface">
            Description
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Routine description"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                selectionColor={colors.primary}
                style={{
                  flex: 1,
                  height: 50,
                  padding: 10,
                  paddingLeft: 40,
                  color: colors.onSurface,
                }}
              />
            )}
            name="description"
          />
        </Box>
      </Box>
      <Box
        backgroundColor="surfaceContainer"
        paddingHorizontal="m"
        paddingVertical="s"
        paddingBottom="l"
      >
        <Button variant="primary" onPress={onSubmit}>
          Next
        </Button>
      </Box>
    </Box>
  );
}
