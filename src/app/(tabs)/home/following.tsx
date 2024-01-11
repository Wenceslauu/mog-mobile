import Box from "@/components/Box";
import Text from "@/components/Text";

export default function FollowingTab() {
  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor="surface"
    >
      <Text variant="title" color="onSurface">
        Following
      </Text>
    </Box>
  );
}
