import Box from "@/components/Box";
import Button from "@/components/Button";
import Text from "@/components/Text";
import { Theme } from "@/constants/theme";
import { useTheme } from "@shopify/restyle";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import TextInput from "@/components/TextInput";
import { Alert, AlertButton, ScrollView } from "react-native";
import { UNSTABLE_usePreventRemove } from "@react-navigation/native";
import { useCreateRoutine } from "@/providers/createRoutine";
import generateDropdownOptionsFromEnum from "@/helpers/generateDropdownOptionsFromEnum";
import CheckboxGroup from "@/components/CheckboxGroup";
import ImageInput from "@/components/ImageInput";
import { createRandomRoutineDraftEdition } from "@/helpers/mocks/Routine";
import {
  RoutineCategoryEnum,
  RoutineDifficultyEnum,
  RoutineDraftGeneralFormData,
  RoutineEquipmentEnum,
} from "@/types/Routine";

const mockedEditionRoutine = createRandomRoutineDraftEdition();

export default function CreateRoutineScreen() {
  const {
    routine,
    setRoutine,
    resetRoutine,
    isDirty,
    image,
    resetImage,
    isLoadingImage,
    generateChangeImageAlert,
  } = useCreateRoutine();

  const { id } = useLocalSearchParams();

  const {
    control,
    formState: { errors },
    reset,
  } = useForm<RoutineDraftGeneralFormData>({
    // GH Issue: https://github.com/react-hook-form/react-hook-form/issues/2492
    // GH Discussion: https://github.com/orgs/react-hook-form/discussions/9046
    // Values option would reinit the form everytime a dependency changes(proposal's option B) and that is not great for performance
    defaultValues: {
      name: routine.name,
      description: routine.description,
      category: routine.category,
      equipment: routine.equipment,
      difficulty: routine.difficulty,
    },
  });

  useEffect(() => {
    if (id) {
      setRoutine(mockedEditionRoutine);

      reset({
        name: mockedEditionRoutine.name,
        description: mockedEditionRoutine.description,
        category: mockedEditionRoutine.category,
        equipment: routine.equipment,
        difficulty: mockedEditionRoutine.difficulty,
      });

      resetImage();
    }
  }, []);

  const onBeforeRemove = useCallback(() => {
    if (id && !isDirty.current) {
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
                isDirty.current = false;
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
                isDirty.current = false;
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

  UNSTABLE_usePreventRemove(isDirty.current, onPreventRemove);

  useEffect(() => {
    navigation.setOptions({
      title: id ? "Edit Routine" : "Create Routine",
    });
  }, [navigation]);

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
            hasImage={!!image || !!id}
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
                      isDirty.current = true;
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
                      isDirty.current = true;
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
                  mode="single"
                  selected={value}
                  handleSelect={(newValue: any): void => {
                    onChange(newValue);
                    setRoutine((draft) => {
                      draft.category = newValue;
                    });
                    isDirty.current = true;
                  }}
                  options={generateDropdownOptionsFromEnum<
                    typeof RoutineCategoryEnum
                  >(RoutineCategoryEnum)}
                />
              )}
              name="category"
            />
          </Box>
          <Box gap="m">
            <Text variant="label" color="onSurface">
              Equipment
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
                      draft.equipment = newValue;
                    });
                    isDirty.current = true;
                  }}
                  options={generateDropdownOptionsFromEnum<
                    typeof RoutineEquipmentEnum
                  >(RoutineEquipmentEnum)}
                />
              )}
              name="equipment"
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
                  mode="multiple"
                  selected={value}
                  handleSelect={(newValue: any): void => {
                    onChange(newValue);
                    setRoutine((draft) => {
                      draft.difficulty = newValue;
                    });
                    isDirty.current = true;
                  }}
                  options={generateDropdownOptionsFromEnum<
                    typeof RoutineDifficultyEnum
                  >(RoutineDifficultyEnum)}
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
