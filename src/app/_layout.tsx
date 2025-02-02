import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import Providers from "@/providers";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // TODO: tentar colocar o useNavigationState aqui
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }

    // if (loaded && rootNavigationState?.key) {
    //  SplashScreen.hideAsync();
    // }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Providers>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="log"
            options={{
              title: "Log",
              presentation: "modal",
              headerShown: false,
            }}
          />
          <Stack.Screen name="activity" options={{ title: "Activity" }} />
          <Stack.Screen name="network" options={{ title: "Network" }} />
          <Stack.Screen
            name="search"
            options={{
              title: "Search",
            }}
          />
          <Stack.Screen
            name="create-edit-routine/index"
            options={{
              // Mandatory in order to prevent going back
              headerBackButtonMenuEnabled: false,
            }}
          />
          <Stack.Screen
            name="create-edit-routine/edit-cycles"
            options={{ title: "Edit Cycles" }}
          />
          <Stack.Screen
            name="create-edit-routine/edit-workout"
            options={{ title: "Edit Workout" }}
          />
          <Stack.Screen
            name="add-exercises"
            options={{ title: "Add Exercises", presentation: "modal" }}
          />
          <Stack.Screen
            name="create-edit-exercise"
            options={{ presentation: "modal" }}
          />
          <Stack.Screen name="settings/index" options={{ title: "Settings" }} />
          <Stack.Screen name="settings/theme" options={{ title: "Theme" }} />
          <Stack.Screen
            name="routines/[id]/(tabs)"
            // https://github.com/expo/router/issues/519#issuecomment-1531038030
            getId={({ params }) => params?.id}
            options={{ title: "Routine Details" }}
          />
          <Stack.Screen
            name="routines/[id]/reviews"
            getId={({ params }) => params?.id}
            options={{ title: "Routine Reviews" }}
          />
          <Stack.Screen
            name="exercises/[id]"
            getId={({ params }) => params?.id}
            options={{ title: "Exercise Details", presentation: "modal" }}
          />
          <Stack.Screen
            name="posts/[id]"
            getId={({ params }) => params?.id}
            options={{ title: "Post Details" }}
          />
          <Stack.Screen
            name="profiles/[id]"
            getId={({ params }) => params?.id}
            options={{ title: "Profile Details" }}
          />
        </Stack>
      </Providers>
    </GestureHandlerRootView>
  );
}
