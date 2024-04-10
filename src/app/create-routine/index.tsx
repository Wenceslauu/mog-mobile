import Box from "@/components/Box";
import Button from "@/components/Button";
import Text from "@/components/Text";
import { Theme } from "@/constants/theme";
import { useTheme } from "@shopify/restyle";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import TextInput from "@/components/TextInput";
import { Alert, AlertButton } from "react-native";
import { UNSTABLE_usePreventRemove } from "@react-navigation/native";
import { useCreateRoutine } from "@/providers/createRoutine";
import { CategoryEnum } from "@/types/Routine";

type FormData = {
  name: string;
  description: string;
  category: CategoryEnum;
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
              authorNotes: "Use foot drive!",
              restDuration: 120,
              sets: [
                {
                  reps: 12,
                  intensity: 9,
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
                  intensity: 9,
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
                  intensity: 9,
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
    useCreateRoutine();

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
      name: routine.name,
      description: routine.description,
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

  const onBeforeRemove = useCallback(() => {
    if (id && !isDirty) {
      resetRoutine();
    }
  }, []);

  useEffect(() => {
    navigation.addListener("beforeRemove", onBeforeRemove);

    return () => {
      navigation.removeListener("beforeRemove", onBeforeRemove);
    };
  }, []);

  const { colors } = useTheme<Theme>();

  const navigation = useNavigation();

  // TODO: Routine edition is being saved as a draft automatically when there are no unsaved changes in edition
  const onPreventRemove = useCallback(
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

  UNSTABLE_usePreventRemove(isDirty, onPreventRemove);

  return (
    <Box flex={1} paddingTop="m" backgroundColor="surface">
      <Box flex={1} gap="l" paddingHorizontal="m">
        <Box gap="m" height={80}>
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
                // placeholder="Routine name"
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
                color="onSurface"
                padding="s"
                paddingLeft="l"
                backgroundColor="surfaceContainer"
                borderRadius="s"
              />
            )}
            name="name"
          />
          {errors.name && <Text>This is required.</Text>}
        </Box>

        {/* TODO: Rich text on description */}
        <Box gap="m" minHeight={200}>
          <Text variant="label" color="onSurface">
            Description
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                // placeholder="Routine description"
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
                color="onSurface"
                padding="s"
                paddingTop="m"
                paddingLeft="l"
                backgroundColor="surfaceContainer"
                borderRadius="s"
                multiline
                numberOfLines={8}
                blurOnSubmit={true}
                textAlignVertical="top"
              />
            )}
            name="description"
          />
        </Box>

        <Box gap="m">
          <Text variant="label" color="onSurface">
            Category
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => <Box></Box>}
            name="category"
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
