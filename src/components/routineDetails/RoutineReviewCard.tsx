import { Ionicons } from "@expo/vector-icons";
import Box from "../Box";
import Text from "../Text";
import Avatar from "../Avatar";
import { RoutineReview } from "@/types/Routine";
import dayjs from "@/lib/dayjs";
import { Theme } from "@/constants/theme";
import { useTheme } from "@shopify/restyle";
import { Pressable, useWindowDimensions } from "react-native";
import { Link } from "expo-router";

type RoutineReviewPreviewCardProps = {
  review: RoutineReview;
  preview?: boolean;
};

export default function RoutineReviewCard({
  review,
  preview,
}: RoutineReviewPreviewCardProps) {
  const { width: windowWidth } = useWindowDimensions();

  return (
    <Box
      gap="m"
      borderRadius="xl"
      width={preview ? windowWidth * 0.75 : "100%"}
      height={preview ? 200 : "auto"}
      minHeight={200}
      backgroundColor={
        review.isHighlighted ? "secondaryContainer" : "surfaceContainer"
      }
      padding="m"
    >
      <Box flexDirection="row" justifyContent="space-between">
        <Box width={windowWidth * 0.3}>
          <Link
            href={{
              pathname: `/profiles/${review.author.id}`,
              params: { name: review.author.name },
            }}
            asChild
          >
            <Pressable>
              {({ pressed }) => (
                <Box flexDirection="row" gap="s" opacity={pressed ? 0.5 : 1}>
                  <Avatar size="s" source={review.author.picture} />
                  <Text variant="body" color="onSurfaceContainer">
                    {review.author.name}
                  </Text>
                </Box>
              )}
            </Pressable>
          </Link>
        </Box>
        <Box gap="xs" alignItems="flex-end">
          <Box>
            <RatingStars rating={review.rating} />
          </Box>
          <Text variant="label" color="onSurfaceContainer">
            {dayjs(review.createdAt).fromNow()}
          </Text>
        </Box>
      </Box>
      <Text
        variant="body"
        color="onSurfaceContainer"
        numberOfLines={preview ? 5 : undefined}
        ellipsizeMode="tail"
      >
        {review.description}
      </Text>
    </Box>
  );
}

export function RatingStars({ rating }: { rating: number }) {
  const { colors } = useTheme<Theme>();

  return (
    <Box
      flexDirection="row"
      gap="xs"
      style={{
        gap: 2,
      }}
    >
      {[...Array(5)].map((_, index) => (
        <Ionicons
          key={index}
          name="star"
          size={16}
          color={index < rating ? colors.tertiary : colors.tertiaryContainer}
        />
      ))}
    </Box>
  );
}
