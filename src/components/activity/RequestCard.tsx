import { FollowRequest } from "@/types/Activity";
import Box from "../Box";
import Text from "../Text";
import Avatar from "../Avatar";
import dayjs from "@/lib/dayjs";
import { Pressable } from "react-native";
import { Theme } from "@/constants/theme";
import { useTheme } from "@shopify/restyle";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type RequestCardProps = {
  request: FollowRequest;
};

export default function RequestCard({ request }: RequestCardProps) {
  const { colors } = useTheme<Theme>();

  return (
    <Link
      href={{
        pathname: `/profiles/${request.requestorUser.id}`,
        params: { name: request.requestorUser.name },
      }}
      asChild
    >
      <Pressable>
        {({ pressed }) => (
          <Box
            backgroundColor={
              request.isRead ? "surfaceContainer" : "secondaryContainer"
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
                {!request.isRead && (
                  <Box
                    height={6}
                    width={6}
                    backgroundColor="primary"
                    borderRadius="full"
                  />
                )}
              </Box>
              <Box flexDirection="row" gap="s" flex={1}>
                <Box opacity={pressed ? 0.5 : 1}>
                  <Avatar size="m" source={request.requestorUser.picture} />
                </Box>
                <Box flexShrink={1} gap="xs">
                  <Text
                    variant="body"
                    color={
                      request.isRead
                        ? "onSurfaceContainer"
                        : "onSecondaryContainer"
                    }
                    numberOfLines={2}
                  >
                    <Text
                      fontWeight="bold"
                      variant="body"
                      color={
                        request.isRead
                          ? "onSurfaceContainer"
                          : "onSecondaryContainer"
                      }
                      opacity={pressed ? 0.5 : 1}
                    >
                      {request.requestorUser.name}
                    </Text>{" "}
                    wants to follow you
                  </Text>
                  <Text
                    variant="label"
                    color={
                      request.isRead
                        ? "onSurfaceContainer"
                        : "onSecondaryContainer"
                    }
                  >
                    {dayjs(request.requestedAt).fromNow()}
                  </Text>
                </Box>
              </Box>
              <Box flexDirection="row">
                <Pressable>
                  {({ pressed }) => (
                    <Ionicons
                      name="close-circle-outline"
                      size={32}
                      color={colors.error}
                      style={{
                        opacity: pressed ? 0.5 : 1,
                      }}
                    />
                  )}
                </Pressable>
                <Pressable>
                  {({ pressed }) => (
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={32}
                      color={colors.primary}
                      style={{
                        opacity: pressed ? 0.5 : 1,
                      }}
                    />
                  )}
                </Pressable>
              </Box>
            </Box>
          </Box>
        )}
      </Pressable>
    </Link>
  );
}
