import { Pressable } from "react-native";
import Box from "./Box";
import Text from "./Text";
import { Image } from "expo-image";
import LoadingSpinner from "./LoadingSpinner";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";

type ImageInputProps = {
  image?: string;
  isLoadingImage: boolean;
  hasImage: boolean;
  generateChangeImageAlert: () => void;

  height?: number;
  width?: number;
  borderRadius?: number;
};

export default function ImageInput({
  image,
  isLoadingImage,
  hasImage,
  generateChangeImageAlert,

  height = 200,
  width = 200,
  borderRadius = 0,
}: ImageInputProps) {
  const { colors } = useTheme<Theme>();

  return (
    <Box alignItems="center" gap="m">
      {hasImage ? (
        <>
          <Image
            source={image}
            style={{
              width,
              height,
              position: "relative",
              opacity: isLoadingImage ? 0.5 : 1,
            }}
          />
          {isLoadingImage && (
            <Box
              width={width}
              height={height}
              justifyContent="center"
              alignItems="center"
              position="absolute"
            >
              <LoadingSpinner />
            </Box>
          )}
        </>
      ) : (
        <Pressable onPress={generateChangeImageAlert}>
          {({ pressed }) => (
            <Box
              width={width}
              height={height}
              style={{
                borderRadius,
              }}
              justifyContent="center"
              alignItems="center"
              backgroundColor="surfaceContainer"
              borderColor="onSurface"
              borderWidth={3}
              borderStyle="dashed"
              opacity={pressed ? 0.5 : 1}
            >
              {!isLoadingImage ? (
                <Ionicons name="camera" size={60} color={colors.onSurface} />
              ) : (
                <LoadingSpinner />
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
  );
}
