import { ScrollView } from "react-native";
import Box from "../Box";
import Text from "../Text";
import { Routine } from "@/types/Routine";
import { Image } from "expo-image";

type RoutineCardProps = {
  routine: Routine;
};

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function RoutineCard({ routine }: RoutineCardProps) {
  return (
    <Box borderRadius={30} width={300}>
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
        padding="m"
        paddingBottom="l"
        paddingTop="s"
        gap="m"
        borderBottomLeftRadius={30}
        borderBottomRightRadius={30}
      >
        <Box gap="xs">
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
          contentContainerStyle={{ gap: 8 }}
        >
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
        </ScrollView>
      </Box>
    </Box>
  );
}
