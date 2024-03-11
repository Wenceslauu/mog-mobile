import Box from "@/components/Box";
import Button from "@/components/Button";
import Text from "@/components/Text";
import { Theme } from "@/constants/theme";
import { CreateRoutineContext } from "@/contexts/createRoutine";
import { useTheme } from "@shopify/restyle";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import TextInput from "@/components/TextInput";
import { Alert, AlertButton } from "react-native";
import { UNSTABLE_usePreventRemove } from "@react-navigation/native";

type FormData = {
  name: string;
  description: string;
};

const mockedRoutine = {
  name: "Teste",
  description: "Teste",
  cycles: [
    {
      name: "Beginning",
      workouts: [
        {
          name: "Push 1",
          exercises: [
            {
              id: 1,
              name: "Bench Press",
              sets: [
                {
                  reps: 12,
                  intensity: "90%",
                },
              ],
            },
          ],
        },
        {
          name: "Push 2",
          exercises: [
            {
              id: 2,
              name: "OHP",
              sets: [
                {
                  reps: 12,
                  intensity: "90%",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Middle",
      workouts: [
        {
          name: "Pull 1",
          exercises: [
            {
              id: 3,
              name: "Deadlift",
              sets: [
                {
                  reps: 12,
                  intensity: "90%",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default function CreateRoutineScreen() {
  const { routine, setRoutine, resetRoutine, isDirty, setIsDirty } =
    useContext(CreateRoutineContext);

  const { id } = useLocalSearchParams();

  const {
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    // GH Issue: https://github.com/react-hook-form/react-hook-form/issues/2492
    // GH Discussion: https://github.com/orgs/react-hook-form/discussions/9046
    // Values option would reinit the form everytime a dependency changes(proposal's option B) and that is not great for performance
    defaultValues: {
      name: routine.name || "",
      description: routine.description || "",
    },
  });

  useEffect(() => {
    if (id) {
      setRoutine(mockedRoutine);

      reset({
        name: mockedRoutine.name,
        description: mockedRoutine.description,
      });
    }
  }, []);

  const { colors } = useTheme<Theme>();

  const navigation = useNavigation();

  const onBeforeRemove = useCallback(
    ({ data }: any) => {
      const alertButtons: AlertButton[] = !id
        ? [
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
                setIsDirty(false);
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
        : [
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
                setIsDirty(false);
                navigation.dispatch(data.action);
              },
            },
          ];

      Alert.alert(
        "Discard Changes?",
        "You have unsaved changes. Are you sure to discard them and leave the screen?",
        alertButtons
      );
    },
    [navigation]
  );

  UNSTABLE_usePreventRemove(isDirty, onBeforeRemove);

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
                  if (routine.name !== value) {
                    setRoutine((draft) => {
                      draft.name = value;
                    });

                    setIsDirty(true);
                  }

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
                  if (routine.description !== value) {
                    setRoutine((draft) => {
                      draft.description = value;
                    });

                    setIsDirty(true);
                  }

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
