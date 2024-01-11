import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";
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

        <Link href="/" style={styles.link}>
          <Text variant="label" color="tertiary">
            Go to home screen!
          </Text>
        </Link>
      </Box>
    </>
  );
}

const styles = StyleSheet.create({
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
