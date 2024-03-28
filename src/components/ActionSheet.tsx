import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback } from "react";
import Box from "./Box";
import Text from "./Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform, Pressable } from "react-native";
import { FullWindowOverlay } from "react-native-screens";

type ActionSheetProps = {
  actions: {
    name: string;
    callback: () => void;
  }[];
  onCloseActionSheet: () => void;
};

export default forwardRef(function ActionSheet(
  { actions, onCloseActionSheet }: ActionSheetProps,
  ref: any
) {
  const insets = useSafeAreaInsets();

  // https://github.com/gorhom/react-native-bottom-sheet/issues/832#issuecomment-1936318986
  // https://github.com/gorhom/react-native-bottom-sheet/issues/832#issuecomment-1949016304
  const containerComponent = useCallback(
    (props: any) => <FullWindowOverlay>{props.children}</FullWindowOverlay>,
    []
  );

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
              action.callback();

              ref.current?.dismiss();
            }}
            key={index}
          >
            {({ pressed }) => (
              // It's important to use a Box as a wrapper hereto avoid the opacity showing through the transparent background
              <Box backgroundColor="secondaryContainer" borderRadius="m">
                <Box
                  padding="m"
                  paddingVertical="l"
                  backgroundColor="secondary"
                  borderRadius="m"
                  opacity={pressed ? 0.5 : 1}
                >
                  <Text variant="body" color="onSecondary" textAlign="center">
                    {action.name}
                  </Text>
                </Box>
              </Box>
            )}
          </Pressable>
        ))}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});
