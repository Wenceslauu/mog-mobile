import { Pressable, ScrollView } from "react-native";
import Box from "../Box";
import Text from "../Text";
import { Routine } from "@/types/Routine";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Theme } from "@/constants/theme";
import { useTheme } from "@shopify/restyle";

type RoutineCardProps = {
  routine: Routine;
  isListedHorizontally?: boolean;
};

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

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
    >
      <Box borderRadius={30} width={isListedHorizontally ? 300 : null}>
        <Image
          source={routine.thumbnail}
          placeholder={blurhash}
          style={{
            width: "100%",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            height: 200,
          }}
        />
        <Box
          backgroundColor="surfaceContainer"
          paddingBottom="l"
          paddingTop="s"
          gap="m"
          borderBottomLeftRadius={30}
          borderBottomRightRadius={30}
        >
          <Box gap="xs" paddingHorizontal="m">
            <Text variant="title" color="onSurface">
              {routine.name}
            </Text>
            <Box flexDirection="row" justifyContent="space-between">
              <Text variant="body" color="onSurfaceContainer">
                {routine.author}
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
            <Pressable>
              <Box
                backgroundColor="primary"
                padding="xs"
                paddingHorizontal="s"
                borderRadius={6}
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
                borderRadius={6}
              >
                <Text variant="body" color="onPrimary">
                  {routine.category}
                </Text>
              </Box>
            </Pressable>
            <Pressable>
              <Box
                backgroundColor="primary"
                padding="xs"
                paddingHorizontal="s"
                borderRadius={6}
              >
                <Text variant="body" color="onPrimary">
                  {routine.daysPerWeek}
                </Text>
              </Box>
            </Pressable>
            <Pressable>
              <Box
                backgroundColor="primary"
                padding="xs"
                paddingHorizontal="s"
                borderRadius={6}
              >
                <Text variant="body" color="onPrimary">
                  {routine.difficulty}
                </Text>
              </Box>
            </Pressable>
            <Pressable>
              <Box
                backgroundColor="primary"
                padding="xs"
                paddingHorizontal="s"
                borderRadius={6}
              >
                <Text variant="body" color="onPrimary">
                  {routine.equipment}
                </Text>
              </Box>
            </Pressable>
            <Pressable>
              <Box
                backgroundColor="primary"
                padding="xs"
                paddingHorizontal="s"
                borderRadius={6}
              >
                <Text variant="body" color="onPrimary">
                  {routine.duration}
                </Text>
              </Box>
            </Pressable>
          </ScrollView>
        </Box>
      </Box>
    </Link>
  );
}
