import { Comment } from "@/types/WorkoutLog";
import Box from "../Box";
import Text from "../Text";
import Avatar from "../Avatar";
import dayjs from "@/lib/dayjs";

type CommentProps = {
  comment: Comment;
};

export default function PostComment({ comment }: CommentProps) {
  return (
    <Box flexDirection="row" gap="s">
      <Avatar source={comment.author.picture} size="s" />
      <Box
        borderColor="outline"
        borderWidth={2}
        flex={1}
        padding="s"
        paddingBottom="m"
        borderRadius={20}
        gap="s"
      >
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text variant="title" color="onSurface">
            {comment.author.name}
          </Text>
          <Text variant="label" color="onSurface">
            {dayjs(comment.timestamp).fromNow()}
          </Text>
        </Box>
        <Text color="onSurface">{comment.text}</Text>
      </Box>
    </Box>
  );
}
