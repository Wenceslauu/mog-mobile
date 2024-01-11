import { Pressable } from "react-native";

import { useEffect } from "react";
import { Link, useNavigation } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Box from "@/components/Box";
import Text from "@/components/Text";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";

export default function ProfileScreen() {
  const { colors } = useTheme<Theme>();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Link href="/settings" asChild>
          <Pressable>
            {({ pressed }) => (
              <Ionicons
                name="settings-outline"
                size={25}
                color={colors.onSurfaceContainer}
                style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </Link>
      ),
      headerRight: () => (
        <Box flexDirection="row">
          <Link href="/edit-profile" asChild>
            <Pressable>
              {({ pressed }) => (
                <MaterialCommunityIcons
                  name="account-edit-outline"
                  size={29}
                  color={colors.onSurfaceContainer}
                  style={{ marginRight: 11, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
          <Link href="/share-profile" asChild>
            <Pressable>
              {({ pressed }) => (
                <Ionicons
                  name="share-social"
                  size={25}
                  color={colors.onSurfaceContainer}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        </Box>
      ),
    });
  }, [navigation]);

  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor="surface"
    >
      <Text variant="title" color="onSurface">
        Profile
      </Text>
    </Box>
  );
}
