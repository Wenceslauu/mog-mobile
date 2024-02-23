import Box from "@/components/Box";
import Text from "@/components/Text";
import CustomTabNavigator from "@/components/CustomTabNavigator";
import { Theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Pressable } from "react-native";

import RoutineDetailsAboutTab from "./about";
import RoutineDetailsWorkoutsTab from "./workouts";

export default function RoutineDetails() {
  const { name } = useLocalSearchParams();
  const { colors } = useTheme<Theme>();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: name,
      headerRight: () => (
        <Box flexDirection="row">
          <Link href="/teste" asChild>
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
          { name: "about", component: RoutineDetailsAboutTab },
          { name: "workouts", component: RoutineDetailsWorkoutsTab },
        ]}
        initialRouteName="about"
      />
      <Box
        backgroundColor="surfaceContainer"
        paddingHorizontal="m"
        paddingVertical="s"
        paddingBottom="l"
      >
        <Pressable>
          {({ pressed }) => (
            <Box
              justifyContent="center"
              alignItems="center"
              backgroundColor="primary"
              padding="m"
              borderRadius="l"
              opacity={pressed ? 0.5 : 1}
            >
              <Text variant="body" color="onPrimary">
                Start routine
              </Text>
            </Box>
          )}
        </Pressable>
      </Box>
    </>
  );
}
