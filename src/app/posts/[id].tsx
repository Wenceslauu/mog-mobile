import Avatar from "@/components/Avatar";
import Box from "@/components/Box";
import Text from "@/components/Text";
import PostComment from "@/components/posts/PostComment";
import { Theme } from "@/constants/theme";
import dayjs from "@/lib/dayjs";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Pressable, useWindowDimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Image } from "expo-image";
import AnimatedDotsCarousel from "react-native-animated-dots-carousel";
import { FlashList } from "@shopify/flash-list";
import ExerciseLogCard from "@/components/postDetails/ExerciseLogCard";
import CommentsBottomSheetModal from "@/components/posts/CommentsBottomSheetModal";
import useCommentSection from "@/hooks/useCommentSection";
import { createRandomPost } from "@/helpers/mocks/Post";

const mockedPost = createRandomPost();

type PostDetailsFlashListHeaderProps = {
  openCommentSection: (id: string) => void;
  focusCommentSectionTextInput: (id: string) => void;
};

function PostDetailsFlashListHeader({
  openCommentSection,
  focusCommentSectionTextInput,
}: PostDetailsFlashListHeaderProps) {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const { colors } = useTheme<Theme>();

  const windowWidth = useWindowDimensions().width;

  return (
    <Box gap="m" paddingTop="m">
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        paddingHorizontal="m"
      >
        <Link
          href={{
            pathname: `/profiles/${mockedPost.author.id}`,
            params: { name: mockedPost.author.name },
          }}
          asChild
        >
          <Pressable>
            {({ pressed }) => (
              <Box flexDirection="row" gap="s" opacity={pressed ? 0.5 : 1}>
                <Avatar source={mockedPost.author.picture} size="m" />
                <Box>
                  <Text variant="title" color="onSurface">
                    {mockedPost.author.name}
                  </Text>
                  <Text variant="label" color="onSurface">
                    {dayjs(mockedPost.workoutLog.loggedAt).format("LLLL")}
                  </Text>
                </Box>
              </Box>
            )}
          </Pressable>
        </Link>
      </Box>
      <Text color="onSurface" paddingHorizontal="m">
        {mockedPost.message}
      </Text>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        paddingHorizontal="m"
      >
        <Box>
          <Text variant="label" color="onSurface">
            Duration
          </Text>
          <Text color="onSurface">
            {dayjs(mockedPost.workoutLog.duration).format("hh:mm:ss")}
          </Text>
        </Box>
        <Box>
          <Text variant="label" color="onSurface">
            Volume
          </Text>
          <Text color="onSurface">{mockedPost.workoutLog.volume}</Text>
        </Box>
        <Box>
          <Text variant="label" color="onSurface">
            Sets
          </Text>
          <Text color="onSurface">{mockedPost.workoutLog.sets}</Text>
        </Box>
        <Box>
          <Text variant="label" color="onSurface">
            Achievements
          </Text>
          <Text color="onSurface">{mockedPost.workoutLog.achievements}</Text>
        </Box>
      </Box>
      <Box backgroundColor="surfaceContainer" position="relative">
        {mockedPost.images.length > 0 ? (
          <Box>
            <Carousel
              width={windowWidth}
              height={300}
              loop={false}
              onProgressChange={(_, absoluteProgress) => {
                // React batch state updates, therefore only one rerender will be triggered
                if (Math.round(absoluteProgress) !== carouselIndex) {
                  setCarouselIndex(Math.round(absoluteProgress));
                }
              }}
              data={mockedPost.images}
              renderItem={({ item, index }) => (
                <Image source={item} key={index} style={{ height: "100%" }} />
              )}
            />
            <Box
              flex={1}
              alignItems="center"
              position="absolute"
              bottom={10}
              right={0}
              left={0}
            >
              <Box backgroundColor="surface" borderRadius="full" padding="xs">
                <AnimatedDotsCarousel
                  length={mockedPost.images.length}
                  currentIndex={carouselIndex}
                  maxIndicators={3}
                  interpolateOpacityAndColor={true}
                  activeIndicatorConfig={{
                    color: colors.primary,
                    margin: 3,
                    opacity: 1,
                    size: 8,
                  }}
                  inactiveIndicatorConfig={{
                    color: colors.secondary,
                    margin: 3,
                    opacity: 0.5,
                    size: 8,
                  }}
                  decreasingDots={[
                    {
                      config: {
                        color: colors.secondary,
                        margin: 3,
                        opacity: 0.5,
                        size: 6,
                      },
                      quantity: 1,
                    },
                    {
                      config: {
                        color: colors.secondary,
                        margin: 3,
                        opacity: 0.5,
                        size: 4,
                      },
                      quantity: 1,
                    },
                  ]}
                />
              </Box>
            </Box>
          </Box>
        ) : null}
      </Box>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        paddingHorizontal="m"
      >
        <Text color="onSurface">
          {mockedPost.likes.length === 0
            ? ""
            : mockedPost.likes.length === 1
            ? "1 like"
            : mockedPost.likes.length + " likes"}
        </Text>
        <Text color="onSurface">
          {mockedPost.comments.length === 0
            ? ""
            : mockedPost.comments.length === 1
            ? "1 comment"
            : mockedPost.comments.length + " comments"}
        </Text>
      </Box>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        paddingHorizontal="m"
      >
        <Box flexDirection="row">
          <Pressable>
            {({ pressed }) => (
              <Ionicons
                name={`heart${mockedPost.isLiked ? "" : "-outline"}`}
                size={29}
                color={
                  mockedPost.isLiked
                    ? colors.primary
                    : colors.onSurfaceContainer
                }
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
          <Pressable
            onPress={() => focusCommentSectionTextInput(mockedPost.id)}
          >
            {({ pressed }) => (
              <Ionicons
                name="chatbubble-outline"
                size={29}
                color={colors.onSurfaceContainer}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </Box>
        <Pressable>
          {({ pressed }) => (
            <Ionicons
              name="share-outline"
              size={27}
              color={colors.onSurfaceContainer}
              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      </Box>
      <Pressable onPress={() => openCommentSection(mockedPost.id)}>
        {({ pressed }) => (
          <Box
            marginHorizontal="m"
            gap="m"
            backgroundColor="surfaceContainer"
            borderRadius="l"
            paddingLeft="m"
            paddingRight="s"
            paddingTop="m"
            paddingBottom="s"
            opacity={pressed ? 0.5 : 1}
          >
            <Box alignItems="center" flexDirection="row" gap="xs">
              <Text variant="title" color="onSurfaceContainer">
                Comments
              </Text>
              <Text variant="body" color="onSurfaceContainer">
                ({mockedPost.comments.length})
              </Text>
            </Box>
            <PostComment comment={mockedPost.comments[0]} />
          </Box>
        )}
      </Pressable>
    </Box>
  );
}

export default function PostDetails() {
  const { id, highlightedCommentId } = useLocalSearchParams();

  const averageHeight = useMemo(() => {
    const sum = mockedPost.workoutLog.exercises.reduce(
      // 113,5 is the height of the exercise log card header, and 35.5 is the height of the set log row
      (acc, exercise) => {
        return acc + exercise.sets.length * 35.5 + 113.5;
      },
      0
    );

    return sum / mockedPost.workoutLog.exercises.length;
  }, []);

  const {
    commentSectionId,
    bottomSheetModalRef,
    bottomSheetTextInputRef,
    openCommentSection,
    onCloseCommentSection,
    focusCommentSectionTextInput,
  } = useCommentSection();

  useEffect(() => {
    if (highlightedCommentId) {
      openCommentSection(mockedPost.id);
    }
  }, [highlightedCommentId]);

  return (
    <>
      <FlashList
        data={mockedPost.workoutLog.exercises}
        estimatedItemSize={averageHeight} // If anything default to 252
        // https://stackoverflow.com/questions/58722141/react-native-flatlist-header-re-rendering-when-scroll/58724298#58724298
        ListHeaderComponent={PostDetailsFlashListHeader({
          openCommentSection,
          focusCommentSectionTextInput,
        })}
        ListHeaderComponentStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => <ExerciseLogCard exerciseLog={item} />}
        ItemSeparatorComponent={() => <Box height={8} />}
        showsVerticalScrollIndicator={false}
      />
      <CommentsBottomSheetModal
        commentSectionId={commentSectionId}
        highlightedCommentId={highlightedCommentId as string}
        onCloseCommentSection={onCloseCommentSection}
        ref={
          {
            bottomSheetModalRef,
            bottomSheetTextInputRef,
          } as any
        }
      />
    </>
  );
}
