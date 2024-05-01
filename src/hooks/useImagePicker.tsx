import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Linking from "expo-linking";
import { useState } from "react";

export default function useImagePicker(aspectRatio: [number, number] = [4, 3]) {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const [cameraStatus, requestCameraPermission] =
    ImagePicker.useCameraPermissions();

  const [mediaLibraryStatus, requestMediaLibraryPermission] =
    ImagePicker.useMediaLibraryPermissions();

  const resetImage = () => {
    setImage(undefined);
  };

  const pickImage = async () => {
    if (mediaLibraryStatus?.granted) {
      // No permissions request is necessary for launching the image library?
      setIsLoadingImage(true);
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: aspectRatio,
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
          aspect: aspectRatio,
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

  return {
    image,
    isLoadingImage,
    resetImage,
    generateChangeImageAlert,
  };
}
