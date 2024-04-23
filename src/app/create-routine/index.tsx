import Box from "@/components/Box";
import Button from "@/components/Button";
import Text from "@/components/Text";
import { Theme } from "@/constants/theme";
import { useTheme } from "@shopify/restyle";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import TextInput from "@/components/TextInput";
import { Alert, AlertButton, ScrollView } from "react-native";
import { UNSTABLE_usePreventRemove } from "@react-navigation/native";
import { useCreateRoutine } from "@/providers/createRoutine";
import { CategoryEnum, DifficultyEnum } from "@/types/Routine";
import generateDropdownOptionsFromEnum from "@/helpers/generateDropdownOptionsFromEnum";
import CheckboxGroup from "@/components/CheckboxGroup";
import ImageInput from "@/components/ImageInput";
import useImagePicker from "@/hooks/useImagePicker";

type FormData = {
  name: string;
  description: string;
  categories: CategoryEnum[];
  difficulty: DifficultyEnum;
};

const mockedEditionRoutine = {
  name: "Teste",
  description: "Teste",
  categories: [CategoryEnum.Bodybuilding],
  difficulty: DifficultyEnum.Beginner,
  thumbnail:
    "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

  const { image, isLoadingImage, generateChangeImageAlert } = useImagePicker([
    16, 9,
  ]);

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
      categories: routine.categories,
      difficulty: routine.difficulty,
    },
  });

  useEffect(() => {
    if (id) {
      setRoutine(mockedEditionRoutine);

      reset({
        name: mockedEditionRoutine.name,
        description: mockedEditionRoutine.description,
        categories: mockedEditionRoutine.categories,
        difficulty: mockedEditionRoutine.difficulty,
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
    <Box flex={1} backgroundColor="surface">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: 16,
        }}
      >
        <Box flex={1} gap="l" paddingHorizontal="m">
          <ImageInput
            image={image ?? mockedEditionRoutine.thumbnail}
            isLoadingImage={isLoadingImage}
            hasImage={!!id || !!image}
            generateChangeImageAlert={generateChangeImageAlert}
            width={356}
            height={200}
          />
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
                  padding="m"
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
                  padding="m"
                  paddingTop="m"
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
              render={({ field: { onChange, value } }) => (
                <CheckboxGroup
                  mode="multiple"
                  selected={value}
                  handleSelect={(newValue: any): void => {
                    onChange(newValue);
                    setRoutine((draft) => {
                      draft.categories = newValue;
                    });
                    setIsDirty(true);
                  }}
                  options={generateDropdownOptionsFromEnum<typeof CategoryEnum>(
                    CategoryEnum
                  )}
                />
              )}
              name="categories"
            />
          </Box>
          <Box gap="m">
            <Text variant="label" color="onSurface">
              Difficulty
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <CheckboxGroup
                  mode="single"
                  selected={value}
                  handleSelect={(newValue: any): void => {
                    onChange(newValue);
                    setRoutine((draft) => {
                      draft.difficulty = newValue;
                    });
                    setIsDirty(true);
                  }}
                  options={generateDropdownOptionsFromEnum<
                    typeof DifficultyEnum
                  >(DifficultyEnum)}
                />
              )}
              name="difficulty"
            />
          </Box>
        </Box>
      </ScrollView>
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
