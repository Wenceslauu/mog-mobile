import Box from "@/components/Box";
import CustomTabNavigator from "@/components/CustomTabNavigator";
import { Theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Pressable } from "react-native";

import ExerciseDetailsAboutTab from "./about";
import ExerciseDetailsChartsTab from "./charts";
import ExerciseDetailsHistoryTab from "./history";

export default function ExerciseDetails() {
  const { id, name } = useLocalSearchParams();
  const { colors } = useTheme<Theme>();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: name,
      headerRight: () => (
        <Box flexDirection="row">
          <Link
            href={{
              pathname: "/create-edit-exercise/",
              params: {
                id,
              },
            }}
            asChild
          >
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
          <Link href="/teste" asChild>
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
  }, [navigation, colors]);

  return (
    <>
      <CustomTabNavigator
        tabs={[
          { name: "about", component: ExerciseDetailsAboutTab },
          { name: "history", component: ExerciseDetailsHistoryTab },
          { name: "charts", component: ExerciseDetailsChartsTab },
        ]}
        initialRouteName="about"
      />
    </>
  );
}
