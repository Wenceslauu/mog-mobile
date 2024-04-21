import {
  Animated,
  KeyboardAvoidingView,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import Box from "../Box";
import Text from "../Text";
import { Theme } from "@/constants/theme";
import { useTheme } from "@shopify/restyle";
import TextInput from "@/components/TextInput";
import { Controller, useForm } from "react-hook-form";
import { useRef } from "react";
import StarRating from "react-native-star-rating-widget";
import Button from "../Button";
import * as Haptics from "expo-haptics";

type FormData = {
  text: string;
  rating: number;
};

type ReviewDraftModalProps = {
  isDraftingReview: boolean;
  isOpenAnimated: Animated.Value;
  toggleDraftModal: () => void;
};

export default function ReviewDraftModal({
  isDraftingReview,
  isOpenAnimated,
  toggleDraftModal,
}: ReviewDraftModalProps) {
  const { colors } = useTheme<Theme>();

  const isDirty = useRef(false);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const {
    control,
    formState: { errors },
  } = useForm<FormData>();

  const backdropOpacity = isOpenAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const scale = isOpenAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const startShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Modal transparent={true} visible={isDraftingReview}>
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={1}
        justifyContent="center"
        alignItems="center"
        // https://reactnative.dev/docs/view#pointerevents
        pointerEvents="box-none"
      >
        <KeyboardAvoidingView behavior={"position"} keyboardVerticalOffset={16}>
          <Animated.View
            style={{
              backgroundColor: colors.surfaceContainer,
              width: 300,
              transform: [{ scale }, { translateX: shakeAnimation }],
              borderRadius: 28,
              padding: 16,
              gap: 16,
            }}
          >
            <Text variant="title" color="onSurfaceContainer">
              Create review
            </Text>
            <Box gap="xs">
              <Text variant="label" color="onSurfaceContainer">
                Rating
              </Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <StarRating
                    rating={value}
                    onChange={(rating) => {
                      if (value !== rating) Haptics.selectionAsync();

                      onChange(rating);
                    }}
                    starSize={30}
                    color={colors.primary}
                    emptyColor={colors.secondary}
                    starStyle={{ marginHorizontal: 1 }}
                  />
                )}
                name="rating"
              />
            </Box>
            <Box gap="s" minHeight={200}>
              <Text variant="label" color="onSurfaceContainer">
                Review text
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
                    backgroundColor="surface"
                    borderRadius="s"
                    multiline
                    numberOfLines={8}
                    blurOnSubmit={true}
                    textAlignVertical="top"
                  />
                )}
                name="text"
              />
            </Box>
            <Button variant="primary" onPress={toggleDraftModal}>
              Create review
            </Button>
          </Animated.View>
        </KeyboardAvoidingView>
      </Box>
      <TouchableWithoutFeedback
        onPress={() => {
          if (isDirty.current) {
            startShake();
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          } else {
            toggleDraftModal();
          }
        }}
      >
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            opacity: backdropOpacity,
          }}
        ></Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
