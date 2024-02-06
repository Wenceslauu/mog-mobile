import Box from "@/components/Box";
import Text from "@/components/Text";
import { Theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Pressable } from "react-native";

export default function RoutineDetails() {
  const { id, name } = useLocalSearchParams();
  const { colors } = useTheme<Theme>();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: name,
      headerRight: () => (
        <Box flexDirection="row">
          <Link href="/edit-profile" asChild>
            <Pressable>
              {({ pressed }) => (
                <Ionicons
                  name="pencil-sharp"
                  size={25}
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
                  name="share-outline"
                  size={25}
                  color={colors.onSurfaceContainer}
                  style={{ opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        </Box>
      ),
    });
  });

  return (
    <Box>
      <Text color="onSurface">{id}</Text>
      <Text color="onSurface">{name}</Text>
    </Box>
  );
}
