import Box from "@/components/Box";
import PostCard from "@/components/home/PostCard";
import { useScrollToTop } from "@react-navigation/native";
import { AnimatedFlashList } from "@shopify/flash-list";
import { useCallback, useContext, useRef, useState } from "react";
import { Animated, TextInput } from "react-native";
import { HomeContext } from "@/contexts/navigators";
import TABVIEW_HEADER_HEIGHT from "@/constants/tabViewHeaderHeight";
import CommentsBottomSheetModal from "@/components/home/CommentsBottomSheetModal";
import { BottomSheetModal, ANIMATION_DURATION } from "@gorhom/bottom-sheet";

const mockedPosts = [
  {
    id: 1,
    author: {
      name: "lui",
      picture: "https://unavatar.io/github/pedroandrade03",
    },
    text: "fazer supino é mt chato affff",
    duration: "1h",
    volume: "2500kg",
    sets: 20,
    achievements: 2,
    likes: 10,
    timestamp: new Date(2024, 0, 17, 9, 30),
    isLiked: true,
    images: [],
    exercises: [
      {
        name: "Dumbbell Bench Press",
        sets: 5,
        exerciseId: 99,
      },
      {
        name: "Crossover",
        sets: 3,
        exerciseId: 100,
      },
      {
        name: "Pushups",
        sets: 3,
        exerciseId: 101,
      },
      {
        name: "Dips",
        sets: 3,
        exerciseId: 102,
      },
      {
        name: "Chest Press Machine",
        sets: 3,
        exerciseId: 103,
      },
    ],
    comments: [
      {
        author: {
          name: "wences",
          picture: "https://unavatar.io/github/Wenceslauu",
        },
        text: "tu ta treinando errado",
        timestamp: new Date(2024, 0, 17, 20),
      },
    ],
  },
  {
    id: 2,
    author: {
      name: "wences",
      picture: "https://unavatar.io/github/Wenceslauu",
    },
    text: "adoro fazer supino",
    duration: "3h",
    volume: "3200kg",
    sets: 30,
    achievements: 2,
    likes: 20,
    timestamp: new Date(2024, 0, 10, 16, 30),
    isLiked: false,
    images: [
      require("../../../../assets/images/bench-press.jpg"),
      require("../../../../assets/images/squat.jpg"),
    ],
    exercises: [
      {
        name: "Dumbbell Bench Press",
        sets: 5,
        exerciseId: 99,
      },
      {
        name: "Crossover",
        sets: 3,
        exerciseId: 100,
      },
      {
        name: "Pushups",
        sets: 3,
        exerciseId: 101,
      },
      {
        name: "Dips",
        sets: 3,
        exerciseId: 102,
      },
      {
        name: "Chest Press Machine",
        sets: 3,
        exerciseId: 103,
      },
    ],
    comments: [
      {
        author: {
          name: "lui",
          picture: "https://unavatar.io/github/pedroandrade03",
        },
        text: "tu ta treinando certo",
        timestamp: new Date(2024, 0, 10, 20),
      },
    ],
  },
];

export default function FollowingTab() {
  const [commentSectionId, setCommentSectionId] = useState<number | null>(null);

  const { scrollY } = useContext(HomeContext);

  const postsListRef = useRef(null);

  // Scroll to top when the active tab is tapped
  useScrollToTop(postsListRef);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const bottomSheetTextInputRef = useRef<TextInput>(null);

  const openCommentSection = useCallback((postId: number) => {
    setCommentSectionId(postId);

    bottomSheetModalRef.current?.present();
  }, []);

  const onCloseCommentSection = useCallback(() => {
    setCommentSectionId(null);
  }, []);

  const focusCommentSectionTextInput = useCallback((postId: number) => {
    openCommentSection(postId);

    setTimeout(() => {
      bottomSheetTextInputRef.current?.focus();
    }, ANIMATION_DURATION);
  }, []);

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
            paddingBottom: 30,
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
