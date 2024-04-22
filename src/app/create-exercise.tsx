import Box from "@/components/Box";
import Button from "@/components/Button";
import CheckboxGroup from "@/components/CheckboxGroup";
import Text from "@/components/Text";
import TextInput from "@/components/TextInput";
import { Theme } from "@/constants/theme";
import generateDropdownOptionsFromEnum from "@/helpers/generateDropdownOptionsFromEnum";
import { ForceEnum, MechanicEnum, TargetMuscleEnum } from "@/types/Exercise";
import { useTheme } from "@shopify/restyle";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Pressable, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Linking from "expo-linking";
import { Ionicons } from "@expo/vector-icons";

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
  const [image, setImage] = useState<string | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const [cameraStatus, requestCameraPermission] =
    ImagePicker.useCameraPermissions();

  const [mediaLibraryStatus, requestMediaLibraryPermission] =
    ImagePicker.useMediaLibraryPermissions();

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

  const pickImage = async () => {
    if (mediaLibraryStatus?.granted) {
      // No permissions request is necessary for launching the image library?
      setIsLoadingImage(true);
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      } catch (error) {
        console.error(error);
      }
      setIsLoadingImage(false);
    } else if (mediaLibraryStatus?.canAskAgain) {
      requestMediaLibraryPermission();
    } else {
      Alert.alert(
        "Permission required",
        "You need to enable media library permissions from settings to pick an image.",
        [
          {
            text: "Open settings",
            onPress: () => Linking.openSettings(),
          },
        ]
      );
    }
  };

  const takePhoto = async () => {
    if (cameraStatus?.granted) {
      setIsLoadingImage(true);
      try {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      } catch (error) {
        console.error(error);
      }
      setIsLoadingImage(false);
    } else if (cameraStatus?.canAskAgain) {
      requestCameraPermission();
    } else {
      Alert.alert(
        "Permission required",
        "You need to enable camera permissions from settings to take a photo.",
        [
          {
            text: "Open settings",
            onPress: () => Linking.openSettings(),
          },
        ]
      );
    }
  };

  const generateChangeImageAlert = () => {
    Alert.alert("Change image", undefined, [
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => {},
      },
      {
        text: "Pick from the media library",
        onPress: pickImage,
      },
      {
        text: "Take a photo",
        onPress: takePhoto,
      },
    ]);
  };

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
          <Box alignItems="center" gap="m">
            {image || id ? (
              <Image
                source={image ?? mockedEditionExercise.image}
                style={{
                  width: 200,
                  height: 200,
                }}
              />
            ) : (
              <Pressable onPress={generateChangeImageAlert}>
                {({ pressed }) => (
                  <Box
                    width={200}
                    height={200}
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor="surfaceContainer"
                    borderColor="onSurface"
                    borderWidth={3}
                    borderStyle="dashed"
                    opacity={pressed ? 0.5 : 1}
                  >
                    {!isLoadingImage ? (
                      <Ionicons
                        name="camera"
                        size={60}
                        color={colors.onSurface}
                      />
                    ) : (
                      <Text color="onSurfaceContainer">Loading image...</Text>
                    )}
                  </Box>
                )}
              </Pressable>
            )}

            <Pressable onPress={generateChangeImageAlert}>
              {({ pressed }) => (
                <Text color="primary" opacity={pressed ? 0.5 : 1}>
                  Change image
                </Text>
              )}
            </Pressable>
          </Box>
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
