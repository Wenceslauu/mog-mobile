import Avatar from "@/components/Avatar";
import Box from "@/components/Box";
import Text from "@/components/Text";
import PostComment from "@/components/home/PostComment";
import { Theme } from "@/constants/theme";
import dayjs from "@/lib/dayjs";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Pressable, useWindowDimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Image } from "expo-image";
import AnimatedDotsCarousel from "react-native-animated-dots-carousel";

const mockedPost = {
  author: {
    name: "wences",
    picture: "https://unavatar.io/github/Wenceslauu",
  },
  text: "brinca muito",
  duration: "5h",
  volume: "10000",
  sets: 50,
  achievements: 12,
  likes: 38,
  timestamp: new Date(2024, 0, 20, 9, 30),
  isLiked: true,
  images: [],
  exercises: [
    {
      exerciseId: 99,
      name: "Dumbbell Bench Press",
      sets: 5,
    },
    {
      exerciseId: 100,
      name: "Crossover",
      sets: 3,
    },
    {
      exerciseId: 101,
      name: "Pushups",
      sets: 3,
    },
    {
      exerciseId: 102,
      name: "Dips",
      sets: 3,
    },
    {
      exerciseId: 103,
      name: "Chest Press Machine",
      sets: 3,
    },
  ],
  comments: [
    {
      author: {
        name: "lui",
        picture: "https://unavatar.io/github/pedroandrade03",
      },
      text: "ta maluco",
      timestamp: new Date(2024, 0, 23, 20),
    },
  ],
};

export default function PostDetails() {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const { id } = useLocalSearchParams();

  const { colors } = useTheme<Theme>();
  const windowWidth = useWindowDimensions().width;

  return (
    <Box gap="m">
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        paddingHorizontal="m"
      >
        <Box flexDirection="row" gap="s">
          <Avatar source={mockedPost.author.picture} size="m" />
          <Box>
            <Text variant="title" color="onSurface">
              {mockedPost.author.name}
            </Text>
            <Text variant="label" color="onSurface">
              {dayjs(mockedPost.timestamp).fromNow()}
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
        {mockedPost.text}
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
          <Text color="onSurface">{mockedPost.duration}</Text>
        </Box>
        <Box>
          <Text variant="label" color="onSurface">
            Volume
          </Text>
          <Text color="onSurface">{mockedPost.volume}</Text>
        </Box>
        <Box>
          <Text variant="label" color="onSurface">
            Sets
          </Text>
          <Text color="onSurface">{mockedPost.sets}</Text>
        </Box>
        <Box>
          <Text variant="label" color="onSurface">
            Achievements
          </Text>
          <Text color="onSurface">{mockedPost.achievements}</Text>
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
                  length={mockedPost.images.length + 1}
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
          {mockedPost.likes === 0
            ? ""
            : mockedPost.likes === 1
            ? "1 like"
            : mockedPost.likes + " likes"}
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
        <PostComment comment={mockedPost.comments[0]} />
      </Box>
    </Box>
  );
}
