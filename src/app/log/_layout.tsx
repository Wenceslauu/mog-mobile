import { Stack } from "expo-router";

export default function LogModalScreen() {
  return (
    <Stack initialRouteName="exercises">
      <Stack.Screen name="exercises" options={{ title: "Log" }} />
      <Stack.Screen name="post" options={{ title: "Post" }} />
    </Stack>
  );
}
