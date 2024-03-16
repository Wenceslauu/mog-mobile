import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { forwardRef } from "react";
import Box from "./Box";
import Text from "./Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Pressable } from "react-native";

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

  return (
    <BottomSheetModal
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
