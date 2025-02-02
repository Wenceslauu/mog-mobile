import { Pressable, ScrollView } from "react-native";
import Box from "../Box";
import Text from "../Text";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Theme } from "@/constants/theme";
import { useTheme } from "@shopify/restyle";
import blurhash from "@/constants/blurhash";
import {
  RoutinePreview,
  RoutineCategoryEnum,
  RoutineEquipmentEnum,
  RoutineDifficultyEnum,
} from "@/types/Routine";

type RoutineCardProps = {
  routine: RoutinePreview;
  isListedHorizontally?: boolean;
};

export default function RoutineCard({
  routine,
  isListedHorizontally,
}: RoutineCardProps) {
  const { colors } = useTheme<Theme>();

  return (
    <Link
      href={{
        pathname: `/routines/${routine.id}`,
        params: { name: routine.name },
      }}
      asChild
    >
      <Pressable>
        {({ pressed }) => (
          <Box
            borderRadius="xl"
            width={isListedHorizontally ? 300 : null}
            opacity={pressed ? 0.5 : 1}
          >
            <Image
              source={routine.thumbnail}
              placeholder={blurhash}
              style={{
                width: "100%",
                borderTopLeftRadius: 28,
                borderTopRightRadius: 28,
                height: 200,
              }}
            />
            <Box
              backgroundColor="surfaceContainer"
              paddingBottom="l"
              paddingTop="s"
              gap="m"
              borderBottomLeftRadius="xl"
              borderBottomRightRadius="xl"
            >
              <Box gap="xs" paddingHorizontal="m">
                <Text variant="title" color="onSurface">
                  {routine.name}
                </Text>
                <Box flexDirection="row" justifyContent="space-between">
                  <Text variant="body" color="onSurfaceContainer">
                    {routine.author.name}
                  </Text>
                  <Text variant="body" color="onSurfaceContainer">
                    {routine.numberOfAthletes} atletas
                  </Text>
                </Box>
              </Box>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}
              >
                {/* The badges are wrapped in pressables so as to stop the routine card click propagation and allow for scrolling inside it */}
                <Pressable>
                  <Box
                    backgroundColor="primary"
                    padding="xs"
                    paddingHorizontal="s"
                    borderRadius="s"
                    flexDirection="row"
                    alignItems="center"
                    gap="xs"
                  >
                    <Ionicons name="star" size={16} color={colors.onPrimary} />
                    <Text variant="body" color="onPrimary">
                      {routine.rating}
                    </Text>
                  </Box>
                </Pressable>
                <Pressable>
                  <Box
                    backgroundColor="primary"
                    padding="xs"
                    paddingHorizontal="s"
                    borderRadius="s"
                  >
                    <Text variant="body" color="onPrimary">
                      {RoutineCategoryEnum[routine.category]}
                    </Text>
                  </Box>
                </Pressable>
                <Pressable>
                  <Box
                    backgroundColor="primary"
                    padding="xs"
                    paddingHorizontal="s"
                    borderRadius="s"
                  >
                    <Text variant="body" color="onPrimary">
                      {routine.minFrequency} - {routine.maxFrequency} days a
                      week
                    </Text>
                  </Box>
                </Pressable>
                <Pressable>
                  <Box
                    backgroundColor="primary"
                    padding="xs"
                    paddingHorizontal="s"
                    borderRadius="s"
                  >
                    <Text variant="body" color="onPrimary">
                      {RoutineDifficultyEnum[routine.difficulty[0]]}
                    </Text>
                  </Box>
                </Pressable>
                <Pressable>
                  <Box
                    backgroundColor="primary"
                    padding="xs"
                    paddingHorizontal="s"
                    borderRadius="s"
                  >
                    <Text variant="body" color="onPrimary">
                      {RoutineEquipmentEnum[routine.equipment]}
                    </Text>
                  </Box>
                </Pressable>
                <Pressable>
                  <Box
                    backgroundColor="primary"
                    padding="xs"
                    paddingHorizontal="s"
                    borderRadius="s"
                  >
                    <Text variant="body" color="onPrimary">
                      {routine.duration} weeks
                    </Text>
                  </Box>
                </Pressable>
              </ScrollView>
            </Box>
          </Box>
        )}
      </Pressable>
    </Link>
  );
}
