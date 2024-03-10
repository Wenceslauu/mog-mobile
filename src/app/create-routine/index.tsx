import Box from "@/components/Box";
import Button from "@/components/Button";
import Text from "@/components/Text";
import { Theme } from "@/constants/theme";
import { CreateRoutineContext } from "@/contexts/createRoutine";
import { useTheme } from "@shopify/restyle";
import { Link, useNavigation } from "expo-router";
import { useCallback, useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import TextInput from "@/components/TextInput";
import { Alert } from "react-native";
import { UNSTABLE_usePreventRemove } from "@react-navigation/native";

type FormData = {
  name: string;
  description: string;
};

export default function CreateRoutineScreen() {
  const { routine, setRoutine, resetRoutine } =
    useContext(CreateRoutineContext);

  const {
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: routine.name || "",
      description: routine.description || "",
    },
  });

  const { colors } = useTheme<Theme>();

  const navigation = useNavigation();

  const onBeforeRemove = useCallback(
    ({ data }: any) => {
      Alert.alert(
        "Discard Changes?",
        "You have unsaved changes. Are you sure to discard them and leave the screen?",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => {},
          },
          {
            text: "Discard",
            style: "destructive",
            onPress: () => {
              resetRoutine();
              navigation.dispatch(data.action);
            },
          },
          {
            text: "Save Draft",
            style: "default",
            onPress: () => {
              navigation.dispatch(data.action);
            },
          },
        ]
      );
    },
    [navigation]
  );

  UNSTABLE_usePreventRemove(true, onBeforeRemove);

  return (
    <Box flex={1} paddingTop="m" backgroundColor="surface">
      <Box flex={1} gap="l" paddingHorizontal="m">
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
                onBlur={() => {
                  setRoutine((prevRoutine: any) => ({
                    ...prevRoutine,
                    name: value,
                  }));

                  onBlur();
                }}
                onChangeText={onChange}
                value={value}
                selectionColor={colors.primary}
                flex={1}
                height={50}
                color="onSurface"
                padding="s"
                paddingLeft="xl"
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
                onBlur={() => {
                  setRoutine((prevRoutine: any) => ({
                    ...prevRoutine,
                    description: value,
                  }));

                  onBlur();
                }}
                onChangeText={onChange}
                value={value}
                selectionColor={colors.primary}
                flex={1}
                height={50}
                color="onSurface"
                padding="s"
                paddingLeft="xl"
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
        <Link href="/create-routine/edit-cycles" asChild>
          <Button variant="primary">Next</Button>
        </Link>
      </Box>
    </Box>
  );
}
