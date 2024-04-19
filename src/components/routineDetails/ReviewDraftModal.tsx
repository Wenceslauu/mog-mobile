import { Animated, Modal, TouchableWithoutFeedback } from "react-native";
import Box from "../Box";
import Text from "../Text";
import { Theme } from "@/constants/theme";
import { useTheme } from "@shopify/restyle";
import TextInput from "@/components/TextInput";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";

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

  const [isDirty, setIsDirty] = useState(false);

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
        <Animated.View
          style={{
            backgroundColor: colors.secondaryContainer,
            width: 300,
            height: 300,
            transform: [{ scale }],
            borderRadius: 28,
            padding: 16,
          }}
        >
          <Text variant="title" color="onSecondaryContainer">
            Create review
          </Text>
          <Box gap="m" minHeight={200}>
            <Text variant="label" color="onSecondaryContainer">
              Review text
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  // placeholder="Routine description"
                  onBlur={onBlur}
                  onChangeText={() => {
                    if (value) {
                      setIsDirty(true);
                    }
                    onChange();
                  }}
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
              name="text"
            />
          </Box>
        </Animated.View>
      </Box>
      <TouchableWithoutFeedback onPress={toggleDraftModal}>
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
