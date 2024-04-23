import Box from "@/components/Box";
import Button from "@/components/Button";
import CheckboxGroup from "@/components/CheckboxGroup";
import Text from "@/components/Text";
import TextInput from "@/components/TextInput";
import { Theme } from "@/constants/theme";
import generateDropdownOptionsFromEnum from "@/helpers/generateDropdownOptionsFromEnum";
import { ForceEnum, MechanicEnum, TargetMuscleEnum } from "@/types/Exercise";
import { useTheme } from "@shopify/restyle";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Animated, ScrollView } from "react-native";
import useImagePicker from "@/hooks/useImagePicker";
import ImageInput from "@/components/ImageInput";

const mockedEditionExercise = {
  name: "Skiers",
  instructions: "Hip hinge and ski!",
  targetMuscle: [TargetMuscleEnum.Shoulders],
  force: ForceEnum.Pull,
  mechanic: MechanicEnum.Isolation,
  image:
    "https://images.pexels.com/photos/1271147/pexels-photo-1271147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
};

type FormData = {
  name: string;
  instructions: string;
  targetMuscle: TargetMuscleEnum[];
  force: ForceEnum;
  mechanic: MechanicEnum;
};

export default function CreateExerciseScreen() {
  const { colors } = useTheme<Theme>();
  const { image, isLoadingImage, generateChangeImageAlert } = useImagePicker([
    4, 3,
  ]);

  const { id } = useLocalSearchParams();

  const isDirty = useRef(false);

  const {
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      targetMuscle: [],
    },
  });

  useEffect(() => {
    if (id) {
      reset({
        name: mockedEditionExercise.name,
        instructions: mockedEditionExercise.instructions,
        force: mockedEditionExercise.force,
        targetMuscle: mockedEditionExercise.targetMuscle,
        mechanic: mockedEditionExercise.mechanic,
      });
    }
  }, []);

  return (
    <Box flex={1} backgroundColor="surface">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: 16,
        }}
      >
        <Box flex={1} gap="m" paddingHorizontal="m">
          <ImageInput
            image={image ?? mockedEditionExercise.image}
            isLoadingImage={isLoadingImage}
            hasImage={!!image || !!id}
            generateChangeImageAlert={generateChangeImageAlert}
          />
          <Box gap="s" height={80}>
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
                  onBlur={onBlur}
                  onChangeText={(text) => {
                    isDirty.current = !!text;

                    onChange(text);
                  }}
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

          <Box gap="s" minHeight={200}>
            <Text variant="label" color="onSurfaceContainer">
              Instructions
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={(text) => {
                    isDirty.current = !!text;

                    onChange(text);
                  }}
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
              name="instructions"
            />
          </Box>

          <Box gap="s">
            <Text variant="label" color="onSurface">
              Target Muscle
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <CheckboxGroup
                  mode="multiple"
                  selected={value}
                  handleSelect={(newValue: any): void => {
                    onChange(newValue);

                    isDirty.current = true;
                  }}
                  options={generateDropdownOptionsFromEnum<
                    typeof TargetMuscleEnum
                  >(TargetMuscleEnum)}
                />
              )}
              name="targetMuscle"
            />
          </Box>
          <Box gap="s">
            <Text variant="label" color="onSurface">
              Mechanic
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <CheckboxGroup
                  mode="single"
                  selected={value}
                  handleSelect={(newValue: any): void => {
                    onChange(newValue);

                    isDirty.current = true;
                  }}
                  options={generateDropdownOptionsFromEnum<typeof MechanicEnum>(
                    MechanicEnum
                  )}
                />
              )}
              name="mechanic"
            />
          </Box>
          <Box gap="s">
            <Text variant="label" color="onSurface">
              Force
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <CheckboxGroup
                  mode="single"
                  selected={value}
                  handleSelect={(newValue: any): void => {
                    onChange(newValue);

                    isDirty.current = true;
                  }}
                  options={generateDropdownOptionsFromEnum<typeof ForceEnum>(
                    ForceEnum
                  )}
                />
              )}
              name="force"
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
        <Button variant="primary">Create exercise</Button>
      </Box>
    </Box>
  );
}
