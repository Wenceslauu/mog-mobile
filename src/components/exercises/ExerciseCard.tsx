import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { Pressable, StyleSheet } from "react-native";
import Box from "../Box";
import Text from "../Text";
import { Exercise } from "@/types/Exercise";
import { Image } from "expo-image";
import { Theme } from "@/constants/theme";

type ExerciseCardProps = {
  exercise: Exercise;
};

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  const { colors } = useTheme<Theme>();
  const exerciseStyles = createExerciseStyles(colors);

  return (
    <Box
      flexDirection="row"
      gap="s"
      height={90}
      padding="s"
      borderTopWidth={1}
      borderColor="outline"
    >
      <Image
        source={exercise.image}
        placeholder={blurhash}
        style={exerciseStyles.image}
      />
      <Box flex={1} flexDirection="row">
        <Box flex={1} alignSelf="flex-start">
          <Text variant="title" color="onSurface">
            {exercise.name}
          </Text>
          <Text variant="label" color="onSurface">
            {exercise.targetMuscle}
          </Text>
        </Box>
        <Box flexDirection="row" gap="s">
          <Box alignSelf="flex-end">
            <Text variant="label" color="onSurface">
              {exercise.personalBest.weight} kg - {exercise.personalBest.reps}
            </Text>
          </Box>
          <Pressable
            onPress={() => console.log("FAVORITE")}
            style={exerciseStyles.icon}
          >
            {({ pressed }) => (
              <Ionicons
                name={`bookmark${exercise.isFavorite ? "" : "-outline"}`}
                size={29}
                color={colors.onSurface}
                style={{
                  opacity: pressed ? 0.5 : 1,
                }}
              />
            )}
          </Pressable>
        </Box>
      </Box>
    </Box>
  );
}

const createExerciseStyles = (colors: Theme["colors"]) => {
  return StyleSheet.create({
    image: {
      width: "20%",
      backgroundColor: colors.secondary,
    },
    icon: {
      alignSelf: "center",
    },
  });
};
