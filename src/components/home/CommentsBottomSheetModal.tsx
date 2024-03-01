import {
  BottomSheetModal,
  BottomSheetFlatList,
  BottomSheetTextInput,
  // BottomSheetFooter,
  // BottomSheetFooterProps,
} from "@gorhom/bottom-sheet";
import Avatar from "../Avatar";
import Box from "../Box";
import Text from "../Text";
import PostComment from "./PostComment";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";
import { StyleSheet, useWindowDimensions } from "react-native";
import { ForwardedRef, forwardRef } from "react";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Comment } from "@/types/WorkoutLog";
import Constants from "expo-constants";

type CommentsBottomSheetModalProps = {
  comments: Comment[];
};

export default forwardRef(function CommentsBottomSheetModal(
  { comments }: CommentsBottomSheetModalProps,
  ref: ForwardedRef<BottomSheetModalMethods>
) {
  const { colors } = useTheme<Theme>();

  const styles = createStyles(colors);

  const windowHeight = useWindowDimensions().height;

  return (
    // TODO: App crash randomly on scroll when input is focused
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={["50%", windowHeight - Constants.statusBarHeight]}
      backgroundStyle={{
        backgroundColor: colors.surfaceContainer,
      }}
      handleIndicatorStyle={{
        backgroundColor: colors.onSurfaceContainer,
      }}
      style={{
        paddingHorizontal: 16,
      }}
      keyboardBlurBehavior="restore"
      keyboardBehavior="extend"
      // footerComponent={(props) => <CustomBottomSheetModalFooter {...props} />}
    >
      <Box
        alignItems="center"
        paddingBottom="m"
        flexDirection="row"
        justifyContent="center"
        gap="xs"
      >
        <Text variant="title" color="onSurfaceContainer">
          Comments
        </Text>
        <Text variant="body" color="onSurfaceContainer">
          ({comments.length})
        </Text>
      </Box>
      <BottomSheetFlatList
        data={comments}
        renderItem={({ item }) => <PostComment comment={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 16 }}
      />
      <Box flexDirection="row" gap="s" paddingTop="m">
        <Avatar source="https://unavatar.io/github/Wenceslauu" size={"s"} />
        <BottomSheetTextInput
          placeholder="Add a comment..."
          onChangeText={(text) => console.log(text)}
          style={styles.input}
          selectionColor={colors.primary}
        />
      </Box>
    </BottomSheetModal>
  );
});

// function CustomBottomSheetModalFooter({
//   animatedFooterPosition,
// }: BottomSheetFooterProps) {
//   const { colors } = useTheme<Theme>();

//   const styles = createStyles(colors);
//   return (
//     <BottomSheetFooter
//       // we pass the bottom safe inset
//       // bottomInset={bottomSafeArea}
//       // we pass the provided `animatedFooterPosition`
//       animatedFooterPosition={animatedFooterPosition}
//     >
//       <Box
//         flexDirection="row"
//         gap="s"
//         paddingTop="m"
//         backgroundColor="surfaceContainer"
//       >
//         <Avatar source="https://unavatar.io/github/Wenceslauu" size={"s"} />
//         <BottomSheetTextInput
//           placeholder="Add a comment..."
//           onChangeText={(text) => console.log(text)}
//           style={styles.input}
//           selectionColor={colors.primary}
//         />
//       </Box>
//     </BottomSheetFooter>
//   );
// }

const createStyles = (colors: Theme["colors"]) => {
  return StyleSheet.create({
    inputIcon: {
      position: "absolute",
      top: 10,
      left: 10,
    },
    input: {
      flex: 1,
      height: 50,
      padding: 10,
      color: colors.onSurface,
      borderColor: colors.outline,
      borderWidth: 1,
      borderRadius: 1000,
      marginBottom: 32,
    },
  });
};
