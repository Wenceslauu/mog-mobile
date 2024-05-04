import { Notification, NotificationType } from "@/types/Activity";
import Box from "../Box";
import Text from "../Text";
import Avatar from "../Avatar";
import dayjs from "@/lib/dayjs";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Theme } from "@/constants/theme";
import { useTheme } from "@shopify/restyle";
import { useActionSheet } from "@/providers/actionSheet";
import { Link } from "expo-router";
import { RatingStars } from "../routineDetails/RoutineReviewCard";

type NotificationCardProps = {
  notification: Notification;
};

function generateNotificationMessage(type: NotificationType) {
  switch (type) {
    case NotificationType.Follow:
      return "started following you";
    case NotificationType.Like:
      return "liked your post";
    case NotificationType.Comment:
      return "commented on your post";
    case NotificationType.Review:
      return "reviewed your routine";
    case NotificationType.Athlete:
      return "started running your routine";
    default:
      return "";
  }
}

function generateNotificationTarget(
  type: NotificationType,
  postText?: string,
  routineName?: string
) {
  if (type === NotificationType.Like || type === NotificationType.Comment) {
    return postText;
  } else if (
    type === NotificationType.Review ||
    type === NotificationType.Athlete
  ) {
    return routineName;
  } else {
    return "";
  }
}

function generateNotificationHref({
  type,
  triggerUser,
  routine,
  review,
  post,
  comment,
}: Pick<
  Notification,
  "type" | "triggerUser" | "routine" | "review" | "post" | "comment"
>) {
  switch (type) {
    case NotificationType.Follow:
      if (!triggerUser) return {};

      return {
        pathname: `/profiles/${triggerUser.id}`,
        params: { name: triggerUser.name },
      };
    case NotificationType.Review:
      if (!routine || !review) return {};

      return {
        pathname: `/routines/${routine.id}/reviews`,
        params: {
          highlightedReviewId: review.id,
        },
      };
    case NotificationType.Athlete:
      if (!routine) return {};

      return {
        pathname: `/routines/${routine.id}`,
        params: { name: routine.name },
      };
    case NotificationType.Like:
      if (!post) return {};

      return {
        pathname: `/posts/${post.id}`,
      };
    case NotificationType.Comment:
      if (!post || !comment) return {};

      console.log("comment IDDDDD", comment.id)

      return {
        pathname: `/posts/${post.id}`,
        params: {
          highlightedCommentId: comment.id,
        },
      };
  }
}

export default function NotificationCard({
  notification,
}: NotificationCardProps) {
  const { openActionSheet } = useActionSheet();

  const { colors } = useTheme<Theme>();

  return (
    <Link
      href={generateNotificationHref({
        type: notification.type,
        triggerUser: notification.triggerUser,
        routine: notification.routine,
        review: notification.review,
        post: notification.post,
        comment: notification.comment,
      })}
      asChild
    >
      <Pressable>
        {({ pressed }) => (
          <Box
            backgroundColor={
              notification.isRead ? "surfaceContainer" : "secondaryContainer"
            }
            paddingVertical="s"
            paddingRight="m"
            gap="s"
            opacity={pressed ? 0.5 : 1}
          >
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                style={{
                  paddingHorizontal: 5,
                  width: 16,
                }}
              >
                {!notification.isRead && (
                  <Box
                    height={6}
                    width={6}
                    backgroundColor="primary"
                    borderRadius="full"
                  />
                )}
              </Box>
              <Box flexDirection="row" gap="s" flex={1}>
                <Link
                  href={{
                    pathname: `/profiles/${notification.triggerUser.id}`,
                    params: { name: notification.triggerUser.name },
                  }}
                  asChild
                >
                  <Pressable>
                    {({ pressed }) => (
                      <Box opacity={pressed ? 0.5 : 1}>
                        <Avatar
                          size="m"
                          source={notification.triggerUser.picture}
                        />
                      </Box>
                    )}
                  </Pressable>
                </Link>
                <Box flexShrink={1} gap="xs">
                  <Text
                    variant="body"
                    color={
                      notification.isRead
                        ? "onSurfaceContainer"
                        : "onSecondaryContainer"
                    }
                    numberOfLines={2}
                  >
                    <Link
                      href={{
                        pathname: `/profiles/${notification.triggerUser.id}`,
                        params: { name: notification.triggerUser.name },
                      }}
                      asChild
                      style={{ marginBottom: -3 }}
                    >
                      <Pressable>
                        {({ pressed }) => (
                          <Text
                            fontWeight="bold"
                            variant="body"
                            color={
                              notification.isRead
                                ? "onSurfaceContainer"
                                : "onSecondaryContainer"
                            }
                            opacity={pressed ? 0.5 : 1}
                          >
                            {notification.triggerUser.name}
                          </Text>
                        )}
                      </Pressable>
                    </Link>{" "}
                    {generateNotificationMessage(notification.type)}{" "}
                    <Text fontWeight="bold">
                      {generateNotificationTarget(
                        notification.type,
                        notification.post?.message,
                        notification.routine?.name
                      )}
                    </Text>
                  </Text>
                  <Text
                    variant="label"
                    color={
                      notification.isRead
                        ? "onSurfaceContainer"
                        : "onSecondaryContainer"
                    }
                  >
                    {dayjs(notification.triggeredAt).fromNow()}
                  </Text>
                </Box>
              </Box>
              <Box>
                <Pressable
                  onPress={() => {
                    openActionSheet([
                      {
                        name: "Silence this type of notification",
                        callback: () =>
                          console.log("Silence this type of notification"),
                      },
                      {
                        name: "Delete notification",
                        callback: () => console.log("Delete notification"),
                      },
                    ]);
                  }}
                >
                  {({ pressed }) => (
                    <MaterialCommunityIcons
                      name="dots-horizontal"
                      size={29}
                      color={
                        notification.isRead
                          ? colors.onSurfaceContainer
                          : colors.onSecondaryContainer
                      }
                      style={{
                        opacity: pressed ? 0.5 : 1,
                      }}
                    />
                  )}
                </Pressable>
              </Box>
            </Box>
            {notification.review ? (
              <Box
                style={{
                  paddingLeft: 94,
                  paddingRight: 45,
                }}
              >
                <RatingStars rating={notification.review.rating} />
              </Box>
            ) : null}
            {(notification.comment || notification.review) && (
              <Box
                paddingLeft="m"
                style={{
                  paddingLeft: 94,
                  paddingRight: 45,
                }}
              >
                <Text
                  variant="body"
                  color={
                    notification.isRead
                      ? "onSurfaceContainer"
                      : "onSecondaryContainer"
                  }
                  opacity={0.75}
                  numberOfLines={2}
                >
                  {notification.comment ? notification.comment.message : null}
                  {notification.review ? notification.review.description : null}
                </Text>
              </Box>
            )}
          </Box>
        )}
      </Pressable>
    </Link>
  );
}
