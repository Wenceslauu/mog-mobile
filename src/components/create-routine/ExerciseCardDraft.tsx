import { Link } from "expo-router";
import Box from "../Box";
import Text from "../Text";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import blurhash from "@/constants/blurhash";
import { Theme } from "@/constants/theme";
import { useTheme } from "@shopify/restyle";
import Button from "../Button";

type ExerciseCardDraftProps = {
  exerciseDraft: {
    id: number;
    name: string;
    image?: any;
    sets: {
      reps: number;
      intensity: string;
    }[];
  };
  handleAddSet: () => void;
};

export default function ExerciseCardDraft({
  exerciseDraft,
  handleAddSet,
}: ExerciseCardDraftProps) {
  const { colors } = useTheme<Theme>();

  return (
    <Box
      gap="s"
      padding="m"
      paddingBottom="xs"
      backgroundColor="surfaceContainer"
    >
      <Link
        href={{
          pathname: `/exercises/${exerciseDraft.id}`,
          params: { name: exerciseDraft.name },
        }}
        asChild
      >
        <Pressable>
          {({ pressed }) => (
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                gap="s"
                flexDirection="row"
                alignItems="center"
                opacity={pressed ? 0.5 : 1}
              >
                <Image
                  source={exerciseDraft.image}
                  placeholder={blurhash}
                  style={{
                    width: 50,
                    height: 50,
                  }}
                />
                <Text variant="title" color="onSurface">
                  {exerciseDraft.name}
                </Text>
              </Box>
              <Ionicons
                name="chevron-forward"
                size={27}
                color={colors.onSurfaceContainer}
                style={{ opacity: pressed ? 0.5 : 1 }}
              />
            </Box>
          )}
        </Pressable>
      </Link>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        borderBottomColor="outlineVariant"
        paddingVertical="s"
        borderBottomWidth={1}
      >
        <Box flex={2}>
          <Text variant="label" color="onSurface">
            Set
          </Text>
        </Box>
        <Box flex={2}>
          <Text variant="label" color="onSurface">
            Reps
          </Text>
        </Box>
        <Box flex={1}>
          <Text variant="label" color="onSurface">
            Weight
          </Text>
        </Box>
      </Box>
      <Box gap="m">
        {exerciseDraft.sets.map((set, index) => {
          return (
            <Box
              key={index}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box flex={2}>
                <Text variant="body" color="onSurfaceContainer">
                  {index + 1}
                </Text>
              </Box>
              <Box flex={2}>
                <Text variant="body" color="onSurfaceContainer">
                  {set.reps}
                </Text>
              </Box>
              <Box flex={1}>
                <Text variant="body" color="onSurfaceContainer">
                  {set.intensity}
                </Text>
              </Box>
            </Box>
          );
        })}
      </Box>
      <Button variant="tertiary" onPress={handleAddSet}>Add set</Button>
    </Box>
  );
}
