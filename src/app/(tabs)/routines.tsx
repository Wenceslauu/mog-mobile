import { Pressable } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation, Link } from "expo-router";
import { useEffect, useState } from "react";
import { Theme } from "@/constants/theme";
import LocalSearchBar from "@/components/LocalSearchBar";
import DismissKeyboardView from "@/components/DismissKeyboardView";
import { useTheme } from "@shopify/restyle";

export default function RoutinesScreen() {
  const [searchText, setSearchText] = useState("");

  const { colors } = useTheme<Theme>();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Link href="/create-routine" asChild>
          <Pressable>
            {({ pressed }) => (
              <Ionicons
                name="add-circle-outline"
                size={29}
                color={colors.onSurfaceContainer}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </Link>
      ),
    });
  }, [navigation]);

  return (
    <DismissKeyboardView
      flex={1}
      alignItems="center"
      justifyContent="center"
      backgroundColor="surface"
    >
      <LocalSearchBar text={searchText} setText={setSearchText} />
    </DismissKeyboardView>
  );
}
