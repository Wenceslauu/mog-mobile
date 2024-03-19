import { Comment } from "@/types/WorkoutLog";
import Box from "../Box";
import Text from "../Text";
import Avatar from "../Avatar";
import dayjs from "@/lib/dayjs";
import { Link } from "expo-router";
import { Pressable } from "react-native";

type CommentProps = {
  comment: Comment;
};

export default function PostComment({ comment }: CommentProps) {
  return (
    <Box flexDirection="row" gap="s">
      <Link
        href={{
          pathname: `/profiles/${comment.author.id}`,
          params: { name: comment.author.name },
        }}
        asChild
      >
        <Pressable>
          {({ pressed }) => (
            <Box opacity={pressed ? 0.5 : 1}>
              <Avatar source={comment.author.picture} size="s" />
            </Box>
          )}
        </Pressable>
      </Link>
      <Box
        backgroundColor="secondaryContainer"
        flex={1}
        padding="m"
        paddingTop="s"
        borderRadius="l"
        gap="s"
      >
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link
            href={{
              pathname: `/routines/${comment.author.id}`,
              params: { name: comment.author.name },
            }}
            asChild
          >
            <Pressable>
              {({ pressed }) => (
                <Text
                  variant="title"
                  color="onSurface"
                  opacity={pressed ? 0.5 : 1}
                >
                  {comment.author.name}
                </Text>
              )}
            </Pressable>
          </Link>
          <Text variant="label" color="onSurface">
            {dayjs(comment.timestamp).fromNow()}
          </Text>
        </Box>
        <Text color="onSurface">{comment.text}</Text>
      </Box>
    </Box>
  );
}
