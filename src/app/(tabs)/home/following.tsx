import Box from "@/components/Box";
import PostCard from "@/components/posts/PostCard";
import { useScrollToTop } from "@react-navigation/native";
import { AnimatedFlashList } from "@shopify/flash-list";
import { useContext, useRef } from "react";
import { Animated } from "react-native";
import { ScrollingContext } from "@/contexts/scrolling";
import TABVIEW_HEADER_HEIGHT from "@/constants/tabViewHeaderHeight";
import CommentsBottomSheetModal from "@/components/posts/CommentsBottomSheetModal";
import useCommentSection from "@/hooks/useCommentSection";
import { createRandomPostPreview } from "@/helpers/mocks/Post";

const mockedPosts = Array.from({ length: 10 }, createRandomPostPreview);

export default function FollowingTab() {
  const { scrollY } = useContext(ScrollingContext);

  const postsListRef = useRef(null);

  // Scroll to top when the active tab is tapped
  useScrollToTop(postsListRef);

  const {
    commentSectionId,
    bottomSheetModalRef,
    bottomSheetTextInputRef,
    openCommentSection,
    onCloseCommentSection,
    focusCommentSectionTextInput,
  } = useCommentSection();

  return (
    <>
      <Box flex={1} gap="xs" backgroundColor="surface">
        <AnimatedFlashList
          ref={postsListRef}
          keyboardDismissMode="on-drag"
          data={mockedPosts}
          estimatedItemSize={100}
          renderItem={({ item }) => (
            <PostCard
              post={item}
              openCommentSection={() => openCommentSection(item.id)}
              focusCommentSectionTextInput={() =>
                focusCommentSectionTextInput(item.id)
              }
            />
          )}
          contentContainerStyle={{
            paddingBottom: 40,
            paddingTop: TABVIEW_HEADER_HEIGHT,
          }}
          ItemSeparatorComponent={() => <Box height={20} />}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollY,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
        />
      </Box>
      <CommentsBottomSheetModal
        commentSectionId={commentSectionId}
        onCloseCommentSection={onCloseCommentSection}
        ref={{ bottomSheetModalRef, bottomSheetTextInputRef } as any}
      />
    </>
  );
}
