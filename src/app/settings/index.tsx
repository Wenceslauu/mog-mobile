import Box from "@/components/Box";
import Text from "@/components/Text";
import { Theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { Link } from "expo-router";
import { Pressable } from "react-native";

export default function SettingsScreen() {
  const { colors } = useTheme<Theme>();

  return (
    <Box
      flex={1}
      gap="m"
      paddingTop="m"
      paddingHorizontal="m"
      backgroundColor="surface"
    >
      <Link href="/settings/theme" asChild>
        <Pressable>
          {({ pressed }) => (
            <Box
              flexDirection="row"
              justifyContent="space-between"
              opacity={pressed ? 0.5 : 1}
            >
              <Text variant="body" color="onSurface">
                Theme
              </Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={colors.onSurface}
              />
            </Box>
          )}
        </Pressable>
      </Link>
      {/* <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text variant="body" color="onSurface">
          Dark Mode
        </Text>
        <Switch value={darkMode} onValueChange={toggleTheme} />
      </Box> */}
    </Box>
  );
}
