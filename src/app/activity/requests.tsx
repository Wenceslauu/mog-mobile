import Box from "@/components/Box";
import Text from "@/components/Text";

export default function RequestsTab() {
  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor="surface"
    >
      <Text variant="title" color="onSurface">
        Requests
      </Text>
    </Box>
  );
}
