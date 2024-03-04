import {
  BottomSheetModal,
  BottomSheetFlatList,
  BottomSheetTextInput,
  BottomSheetFooter,
  BottomSheetFooterProps,
} from "@gorhom/bottom-sheet";
import Avatar from "../Avatar";
import Box from "../Box";
import Text from "../Text";
import PostComment from "./PostComment";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";
import { StyleSheet, useWindowDimensions } from "react-native";
import { forwardRef } from "react";
import Constants from "expo-constants";

type CommentsBottomSheetModalProps = {
  commentSectionId: number | null;
  onCloseCommentSection?: () => void;
};

export default forwardRef(function CommentsBottomSheetModal(
  { commentSectionId, onCloseCommentSection }: CommentsBottomSheetModalProps,
  ref: any
) {
  const { bottomSheetModalRef, bottomSheetTextInputRef } = ref;

  const mockedComments =
    commentSectionId === null
      ? []
      : commentSectionId === 1
      ? [
          {
            author: {
              name: "lui",
              picture: "https://unavatar.io/github/pedroandrade03",
            },
            text: "ta maluco",
            timestamp: new Date(2024, 0, 23, 20),
          },
          {
            author: {
              name: "lui",
              picture: "https://unavatar.io/github/pedroandrade03",
            },
            text: "ta maluco",
            timestamp: new Date(2024, 0, 23, 20),
          },
          {
            author: {
              name: "lui",
              picture: "https://unavatar.io/github/pedroandrade03",
            },
            text: "ta maluco",
            timestamp: new Date(2024, 0, 23, 20),
          },
          {
            author: {
              name: "lui",
              picture: "https://unavatar.io/github/pedroandrade03",
            },
            text: "ta maluco",
            timestamp: new Date(2024, 0, 23, 20),
          },
          {
            author: {
              name: "lui",
              picture: "https://unavatar.io/github/pedroandrade03",
            },
            text: "ta maluco",
            timestamp: new Date(2024, 0, 23, 20),
          },
          {
            author: {
              name: "lui",
              picture: "https://unavatar.io/github/pedroandrade03",
            },
            text: "ta maluco",
            timestamp: new Date(2024, 0, 23, 20),
          },
          {
            author: {
              name: "lui",
              picture: "https://unavatar.io/github/pedroandrade03",
            },
            text: "ta maluco",
            timestamp: new Date(2024, 0, 23, 20),
          },
        ]
      : commentSectionId === 2
      ? [
          {
            author: {
              name: "wences",
              picture: "https://unavatar.io/github/Wenceslauu",
            },
            text: "tu ta treinando errado",
            timestamp: new Date(2024, 0, 17, 20),
          },
        ]
      : [];

  const { colors } = useTheme<Theme>();

  const windowHeight = useWindowDimensions().height;

  return (
    // TODO: App crash randomly on scroll when input is focused
    // TODO: Create custom bottom sheet component
    <BottomSheetModal
      ref={bottomSheetModalRef}
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
        paddingBottom: 16,
      }}
      android_keyboardInputMode="adjustResize"
      keyboardBehavior="extend"
      keyboardBlurBehavior="restore"
      footerComponent={(props) => (
        <CustomBottomSheetModalFooter
          {...props}
          bottomSheetTextInputRef={bottomSheetTextInputRef}
        />
      )}
      onDismiss={onCloseCommentSection}
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
          ({mockedComments.length})
        </Text>
      </Box>
      <BottomSheetFlatList
        data={mockedComments}
        renderItem={({ item }) => <PostComment comment={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 16 }}
      />
    </BottomSheetModal>
  );
});

function CustomBottomSheetModalFooter({
  animatedFooterPosition,
  bottomSheetTextInputRef,
}: BottomSheetFooterProps & {
  bottomSheetTextInputRef: any;
}) {
  const { colors } = useTheme<Theme>();

  const styles = createStyles(colors);

  return (
    <BottomSheetFooter animatedFooterPosition={animatedFooterPosition}>
      <Box
        flexDirection="row"
        gap="s"
        paddingTop="s"
        paddingBottom="s"
        backgroundColor="surfaceContainer"
      >
        <Avatar source="https://unavatar.io/github/Wenceslauu" size={"s"} />
        <BottomSheetTextInput
          ref={bottomSheetTextInputRef}
          placeholder="Add a comment..."
          onChangeText={(text) => console.log(text)}
          style={styles.input}
          selectionColor={colors.primary}
        />
      </Box>
    </BottomSheetFooter>
  );
}

const createStyles = (colors: Theme["colors"]) => {
  return StyleSheet.create({
    input: {
      flex: 1,
      height: 50,
      padding: 10,
      color: colors.onSurface,
      borderColor: colors.outline,
      borderWidth: 1,
      borderRadius: 1000,
    },
  });
};
