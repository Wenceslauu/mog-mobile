import { Link, Stack } from "expo-router";
import Box from "@/components/Box";
import Text from "@/components/Text";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        padding="m"
        backgroundColor="surface"
      >
        <Text variant="title" color="onSurface">
          This screen doesn't exist.
        </Text>

        <Link
          href="/"
          style={{
            marginTop: 15,
            paddingVertical: 15,
          }}
        >
          <Text variant="label" color="tertiary">
            Go to home screen!
          </Text>
        </Link>
      </Box>
    </>
  );
}
