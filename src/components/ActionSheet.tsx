import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback, useRef } from "react";
import Box from "./Box";
import Text from "./Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Animated, Platform, Pressable } from "react-native";
import { FullWindowOverlay } from "react-native-screens";
import { Action } from "@/providers/actionSheet";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";
import * as Haptics from "expo-haptics";

type ActionSheetProps = {
  actions: Action[];
  onCloseActionSheet: () => void;
};

export default forwardRef(function ActionSheet(
  { actions, onCloseActionSheet }: ActionSheetProps,
  ref: any
) {
  const { colors } = useTheme<Theme>();

  const insets = useSafeAreaInsets();

  // https://github.com/gorhom/react-native-bottom-sheet/issues/832#issuecomment-1936318986
  // https://github.com/gorhom/react-native-bottom-sheet/issues/832#issuecomment-1949016304
  const containerComponent = useCallback(
    (props: any) => <FullWindowOverlay>{props.children}</FullWindowOverlay>,
    []
  );

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
    <BottomSheetModal
      containerComponent={
        Platform.OS === "ios" ? containerComponent : undefined
      }
      ref={ref}
      index={0}
      enableHandlePanningGesture={false}
      enableContentPanningGesture={false}
      enableDynamicSizing={true}
      backgroundStyle={{
        backgroundColor: "transparent",
      }}
      handleIndicatorStyle={{ backgroundColor: "transparent" }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      )}
      onDismiss={onCloseActionSheet}
    >
      <BottomSheetScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom,
          paddingHorizontal: 16,
          gap: 8,
        }}
      >
        {actions.map((action, index) => (
          <Pressable
            onPress={() => {
              if (action.isDisabled) {
                startShake();
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Error
                );
              } else {
                action.callback();

                ref.current?.dismiss();
              }
            }}
            key={index}
          >
            {({ pressed }) => (
              // It's important to use a Box as a wrapper hereto avoid the opacity showing through the transparent background
              <Animated.View
                style={{
                  backgroundColor: colors.secondaryContainer,
                  borderRadius: 12,
                  transform: [{ translateX: shakeAnimation }],
                }}
              >
                <Box backgroundColor="secondaryContainer" borderRadius="m">
                  <Box
                    padding="m"
                    paddingVertical="l"
                    backgroundColor="secondary"
                    borderRadius="m"
                    opacity={pressed && !action.isDisabled ? 0.5 : 1}
                  >
                    {!action.isDisabled && (
                      <Text
                        variant="body"
                        color="onSecondary"
                        textAlign="center"
                      >
                        {action.name}
                      </Text>
                    )}
                    {action.isDisabled && action.disabledText && (
                      <Text
                        variant="body"
                        color="onSecondary"
                        textAlign="center"
                      >
                        {action.disabledText}
                      </Text>
                    )}
                  </Box>
                </Box>
              </Animated.View>
            )}
          </Pressable>
        ))}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});
