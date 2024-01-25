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
import ExerciseLogPreviewCard from "./ExerciseLogPreviewCard";
import Carousel from "react-native-reanimated-carousel";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
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
            Tempo
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
            Séries
          </Text>
          <Text color="onSurface">{post.sets}</Text>
        </Box>
        <Box>
          <Text variant="label" color="onSurface">
            Conquistas
          </Text>
          <Text color="onSurface">{post.achievements}</Text>
        </Box>
      </Box>
      {post.images.length > 0 ? (
        // <Image source={post.images[0]} style={{ width: "100%", height: 200 }} />
        <Carousel
          width={windowWidth}
          height={300}
          data={post.images}
          renderItem={({ item, index }) => (
            <Image source={item} key={index} style={{ height: "100%" }} />
          )}
        />
      ) : post.exercises.length > 0 ? (
        <Box gap="s" paddingHorizontal="m">
          {post.exercises.slice(0, 3).map((exercise, index) => {
            return (
              <ExerciseLogPreviewCard exerciseLog={exercise} key={index} />
            );
          })}
          {post.exercises.length > 3 && (
            <Text variant="body" color="onSurface" textAlign="center">
              + {post.exercises.length - 3} exercises
            </Text>
          )}
        </Box>
      ) : null}
      <Box
        flexDirection="row"
        justifyContent="space-between"
        paddingHorizontal="m"
      >
        <Text color="onSurface">
          {post.likes === 0
            ? ""
            : post.likes === 1
            ? post.likes + " curtida"
            : post.likes + " curtidas"}
        </Text>
        <Text color="onSurface">
          {post.comments.length === 0
            ? ""
            : post.comments.length === 1
            ? post.comments.length + " comentário"
            : post.comments.length + " comentários"}
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
