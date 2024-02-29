import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import Providers from "@/providers";

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
    <Providers>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="log"
          options={{ presentation: "modal", title: "Log" }}
        />
        <Stack.Screen name="activity" options={{ title: "Activity" }} />
        <Stack.Screen
          name="create-routine"
          options={{ title: "Create Routine" }}
        />
        <Stack.Screen name="settings/index" options={{ title: "Settings" }} />
        <Stack.Screen name="settings/theme" options={{ title: "Theme" }} />
        <Stack.Screen
          name="routines/[id]"
          options={{ title: "Routine Details" }}
        />
        <Stack.Screen
          name="exercises/[id]"
          options={{ title: "Exercise Details" }}
        />
      </Stack>
    </Providers>
  );
}
