import { Post } from "@/types/WorkoutLog";
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
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
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
                <Box flexDirection="row" gap="s">
                  <Avatar source={post.author.picture} size="m" />
                  <Box>
                    <Text variant="title" color="onSurface">
                      {post.author.name}
                    </Text>
                    <Text variant="label" color="onSurface">
                      {dayjs(post.timestamp).fromNow()}
                    </Text>
                  </Box>
                </Box>
                <Pressable>
                  {({ pressed }) => (
                    <Ionicons
                      name="chevron-forward"
                      size={27}
                      color={colors.onSurfaceContainer}
                      style={{ opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Box>
              <Text color="onSurface" paddingHorizontal="m">
                {post.text}
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
                  <Text color="onSurface">{post.duration}</Text>
                </Box>
                <Box>
                  <Text variant="label" color="onSurface">
                    Volume
                  </Text>
                  <Text color="onSurface">{post.volume}</Text>
                </Box>
                <Box>
                  <Text variant="label" color="onSurface">
                    Sets
                  </Text>
                  <Text color="onSurface">{post.sets}</Text>
                </Box>
                <Box>
                  <Text variant="label" color="onSurface">
                    Achievements
                  </Text>
                  <Text color="onSurface">{post.achievements}</Text>
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
              data={post.images.concat({ exercises: post.exercises })}
              renderItem={({ item, index }) => {
                if (index === post.images.length) {
                  return <ExerciseLogPreviewList exercises={post.exercises} />;
                }
                return (
                  <Image source={item} key={index} style={{ height: "100%" }} />
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
        ) : post.exercises.length > 0 ? (
          <ExerciseLogPreviewList exercises={post.exercises} />
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
        <Text color="onSurface">
          {post.comments.length === 0
            ? ""
            : post.comments.length === 1
            ? "1 comment"
            : post.comments.length + " comments"}
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
                name={`heart${post.isLiked ? "" : "-outline"}`}
                size={29}
                color={
                  post.isLiked ? colors.primary : colors.onSurfaceContainer
                }
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
          <Pressable>
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
      <Box paddingHorizontal="m">
        <PostComment comment={post.comments[0]} />
      </Box>
    </Box>
  );
}
