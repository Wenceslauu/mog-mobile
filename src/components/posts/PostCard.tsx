import { PostPreview } from "@/types/Post";
import Box from "../Box";
import Text from "../Text";
import Avatar from "../Avatar";
import { Image } from "expo-image";
import dayjs from "@/lib/dayjs";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, useWindowDimensions } from "react-native";
import { Theme } from "@/constants/theme";
import { useTheme } from "@shopify/restyle";
import PostComment from "./PostComment";
import Carousel from "react-native-reanimated-carousel";
import { useState } from "react";
import AnimatedDotsCarousel from "react-native-animated-dots-carousel";
import ExerciseLogPreviewList from "./ExerciseLogPreviewList";
import { Link } from "expo-router";

type PostCardProps = {
  post: PostPreview;
  openCommentSection: () => void;
  focusCommentSectionTextInput: () => void;
};

export default function PostCard({
  post,
  openCommentSection,
  focusCommentSectionTextInput,
}: PostCardProps) {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const { colors } = useTheme<Theme>();
  const windowWidth = useWindowDimensions().width;

  return (
    <Box gap="m">
      <Link
        href={{
          pathname: `/posts/${post.id}`,
        }}
        asChild
      >
        <Pressable>
          {({ pressed }) => (
            <Box gap="m" opacity={pressed ? 0.5 : 1}>
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                paddingHorizontal="m"
              >
                <Link
                  href={{
                    pathname: `/profiles/${post.author.id}`,
                    params: { name: post.author.name },
                  }}
                  asChild
                >
                  <Pressable>
                    {({ pressed }) => (
                      <Box
                        flexDirection="row"
                        gap="s"
                        opacity={pressed ? 0.5 : 1}
                      >
                        <Avatar source={post.author.picture} size="m" />
                        <Box>
                          <Text variant="title" color="onSurface">
                            {post.author.name}
                          </Text>
                          <Text variant="label" color="onSurface">
                            {dayjs(post.workoutLog.loggedAt).fromNow()}
                          </Text>
                        </Box>
                      </Box>
                    )}
                  </Pressable>
                </Link>
                <Ionicons
                  name="chevron-forward"
                  size={27}
                  color={colors.onSurfaceContainer}
                  style={{ opacity: pressed ? 0.5 : 1 }}
                />
              </Box>
              <Text color="onSurface" paddingHorizontal="m">
                {post.message}
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
                    {dayjs(post.workoutLog.duration).format("hh:mm:ss")}
                  </Text>
                </Box>
                <Box>
                  <Text variant="label" color="onSurface">
                    Volume
                  </Text>
                  <Text color="onSurface">{post.workoutLog.volume}</Text>
                </Box>
                <Box>
                  <Text variant="label" color="onSurface">
                    Sets
                  </Text>
                  <Text color="onSurface">{post.workoutLog.sets}</Text>
                </Box>
                <Box>
                  <Text variant="label" color="onSurface">
                    Achievements
                  </Text>
                  <Text color="onSurface">{post.workoutLog.achievements}</Text>
                </Box>
              </Box>
            </Box>
          )}
        </Pressable>
      </Link>
      <Box backgroundColor="surfaceContainer" position="relative">
        {post.images.length > 0 ? (
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
              data={[...post.images, post.workoutLog.exercises]}
              renderItem={({ item, index }) => {
                if (index === post.images.length) {
                  return (
                    <ExerciseLogPreviewList
                      exercises={post.workoutLog.exercises}
                    />
                  );
                }
                return (
                  <Image
                    source={item as string}
                    key={index}
                    style={{ height: "100%" }}
                  />
                );
              }}
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
                  length={post.images.length + 1}
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
        ) : post.workoutLog.exercises.length > 0 ? (
          <ExerciseLogPreviewList exercises={post.workoutLog.exercises} />
        ) : null}
      </Box>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        paddingHorizontal="m"
      >
        <Text color="onSurface">
          {post.likes === 0
            ? ""
            : post.likes === 1
            ? "1 like"
            : post.likes + " likes"}
        </Text>
        <Pressable onPress={openCommentSection}>
          {({ pressed }) => (
            <Text color="onSurface" opacity={pressed ? 0.5 : 1}>
              {post.comments.length === 0
                ? ""
                : post.comments.length === 1
                ? "1 comment"
                : post.comments.length + " comments"}
            </Text>
          )}
        </Pressable>
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
                name={`heart${post.isLiked ? "" : "-outline"}`}
                size={29}
                color={
                  post.isLiked ? colors.primary : colors.onSurfaceContainer
                }
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
          <Pressable onPress={focusCommentSectionTextInput}>
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
      <Pressable onPress={openCommentSection}>
        {({ pressed }) => (
          <Box paddingHorizontal="m" opacity={pressed ? 0.5 : 1}>
            <PostComment comment={post.comments[0]} />
          </Box>
        )}
      </Pressable>
    </Box>
  );
}
