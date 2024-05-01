import {
  BottomSheetModal,
  BottomSheetFlatList,
  BottomSheetTextInput,
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import Avatar from "../Avatar";
import Box from "../Box";
import Text from "../Text";
import PostComment from "./PostComment";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";
import { useWindowDimensions } from "react-native";
import { forwardRef } from "react";
import Constants from "expo-constants";
import { faker } from "@faker-js/faker";
import { createRandomComment } from "@/helpers/mocks/Post";

const mockedHightlightedComment = createRandomComment(true);

const mockedComments = Array.from(
  { length: faker.number.int({ min: 1, max: 5 }) },
  createRandomComment
);

type CommentsBottomSheetModalProps = {
  commentSectionId: string | null;
  highlightedCommentId?: string;
  onCloseCommentSection?: () => void;
};

export default forwardRef(function CommentsBottomSheetModal(
  {
    commentSectionId,
    highlightedCommentId,
    onCloseCommentSection,
  }: CommentsBottomSheetModalProps,
  ref: any
) {
  const { bottomSheetModalRef, bottomSheetTextInputRef } = ref;

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
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      )}
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
        data={
          highlightedCommentId
            ? [mockedHightlightedComment, ...mockedComments]
            : mockedComments
        }
        renderItem={({ item }) => (
          <PostComment
            comment={item}
            closeCommentSection={() => {
              bottomSheetModalRef.current?.dismiss();
            }}
          />
        )}
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
          style={{
            flex: 1,
            height: 50,
            padding: 10,
            color: colors.onSurface,
            borderColor: colors.outline,
            borderWidth: 1,
            borderRadius: 1000,
          }}
          selectionColor={colors.primary}
        />
      </Box>
    </BottomSheetFooter>
  );
}
