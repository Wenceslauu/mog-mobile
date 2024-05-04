import {
  Animated,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import Box from "./Box";
import Text from "./Text";
import { Modal as RNModal } from "react-native";
import { ReactNode, useRef } from "react";
import * as Haptics from "expo-haptics";
import { Theme } from "@/constants/theme";
import { useTheme } from "@shopify/restyle";
import Button from "./Button";

type ModalProps = {
  isOpen: boolean;
  isOpenAnimated: Animated.Value;
  toggleModal: () => void;

  isLocked?: boolean;
  title: string;
  contentComponent: () => ReactNode;
};

export default function Modal({
  isOpen,
  isOpenAnimated,
  toggleModal,
  isLocked,
  title,
  contentComponent,
}: ModalProps) {
  const { colors } = useTheme<Theme>();

  const backdropOpacity = isOpenAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const scale = isOpenAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const shakeAnimation = useRef(new Animated.Value(0)).current;
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
    <RNModal transparent={true} visible={isOpen}>
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
              {title}
            </Text>
            {contentComponent()}
            <Button variant="primary" onPress={toggleModal}>
              {title}
            </Button>
          </Animated.View>
        </KeyboardAvoidingView>
      </Box>
      <TouchableWithoutFeedback
        onPress={() => {
          if (isLocked) {
            startShake();
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          } else {
            toggleModal();
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
    </RNModal>
  );
}
