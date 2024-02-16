import { Ionicons } from "@expo/vector-icons";
import Box from "../Box";
import Text from "../Text";
import Avatar from "../Avatar";
import { RoutineReview } from "@/types/Routine";
import dayjs from "@/lib/dayjs";
import { Theme } from "@/constants/theme";
import { useTheme } from "@shopify/restyle";

type RoutineReviewPreviewCardProps = {
  review: RoutineReview;
};

export default function RoutineReviewCard({
  review,
}: RoutineReviewPreviewCardProps) {
  return (
    <Box
      gap="m"
      borderRadius={30}
      width={300}
      height={200}
      backgroundColor="surfaceContainer"
      padding="m"
    >
      <Box flexDirection="row" justifyContent="space-between">
        <Box flexDirection="row" gap="s">
          <Avatar
            size="s"
            source={{ uri: "https://unavatar.io/github/Wenceslauu" }}
          />
          <Text variant="body" color="onSurfaceContainer">
            {review.author.name}
          </Text>
        </Box>
        <Box alignItems="flex-end" gap="xs">
          <Box>
            <RatingStars rating={review.rating} />
          </Box>
          <Text variant="label" color="onSurfaceContainer">
            {dayjs(review.date).fromNow()}
          </Text>
        </Box>
      </Box>
      <Text variant="body" color="onSurfaceContainer">
        {review.text}
      </Text>
    </Box>
  );
}

function RatingStars({ rating }: { rating: number }) {
  const { colors } = useTheme<Theme>();

  return (
    <Box flexDirection="row" gap="s">
      {[...Array(5)].map((_, index) => (
        <Ionicons
          key={index}
          name="star"
          size={16}
          color={index < rating ? colors.onSurfaceContainer : colors.onSurface}
          style={{ marginLeft: -6 }}
        />
      ))}
    </Box>
  );
}
