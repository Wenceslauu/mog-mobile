import { Link } from "expo-router";
import { Pressable } from "react-native";
import Box from "../Box";
import Avatar from "../Avatar";
import Text from "../Text";
import { Ionicons } from "@expo/vector-icons";
import Button from "../Button";
import { ProfilePreview } from "@/types/User";

type UserCardProps = {
  user: ProfilePreview;
};

export default function UserCard({ user }: UserCardProps) {
  return (
    <Link
      href={{
        pathname: `/profiles/${user.id}`,
        params: { name: user.name },
      }}
      asChild
    >
      <Pressable>
        {({ pressed }) => (
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            backgroundColor="surfaceContainer"
            paddingVertical="s"
            paddingHorizontal="m"
            opacity={pressed ? 0.5 : 1}
          >
            <Box flexDirection="row" gap="s">
              <Avatar source={user.picture} size="m" />
              <Text variant="body" color="onSurface">
                {user.name}
              </Text>
            </Box>
            {!user.isFollowed && (
              <Button
                variant="secondary"
                size="s"
                icon={(color, size) => (
                  <Ionicons
                    name="person-add-outline"
                    color={color}
                    size={size}
                  />
                )}
                onPress={() => {
                  console.log("Follow");
                }}
              >
                Follow
              </Button>
            )}
          </Box>
        )}
      </Pressable>
    </Link>
  );
}
