import { Theme } from "@/constants/theme";
import { Workout } from "@/types/Routine";
import { useTheme } from "@shopify/restyle";
import { useEffect, useState } from "react";
import { Pressable } from "react-native";
import Box from "../Box";
import Text from "../Text";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import blurhash from "@/constants/blurhash";

type WorkoutCardProps = {
  workout: Workout;
  isFirst?: boolean;
};

export default function WorkoutCard({ workout, isFirst }: WorkoutCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isFirst) {
      setIsExpanded(true);
    }
  }, [isFirst]);

  const { colors } = useTheme<Theme>();

  return (
    <Pressable onPress={() => setIsExpanded(!isExpanded)}>
      {({ pressed }) => {
        return (
          <Box
            borderRadius="l"
            backgroundColor="surfaceContainer"
            padding="m"
            gap="m"
            opacity={pressed ? 0.5 : 1}
          >
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text variant="title" color="onSurface">
                {workout.name}
              </Text>
              <Ionicons
                name={`chevron-${isExpanded ? "up" : "down"}`}
                size={27}
                color={colors.onSurfaceContainer}
              />
            </Box>
            {isExpanded && (
              <Box gap="l">
                {workout.exercises.map((exercise, index) => {
                  return (
                    <Box key={index} gap="s">
                      <Box
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box gap="s" flexDirection="row" alignItems="center">
                          <Image
                            source={exercise.image}
                            placeholder={blurhash}
                            style={{
                              width: 50,
                              height: 50,
                            }}
                          />
                          <Text variant="title" color="onSurface">
                            {exercise.name}
                          </Text>
                        </Box>
                        <Pressable>
                          {({ pressed }) => (
                            <Ionicons
                              name="chevron-forward"
                              size={27}
                              color={colors.onSurfaceContainer}
                              style={{ opacity: pressed ? 0.5 : 1 }}
                            />
                          )}
                        </Pressable>
                      </Box>
                      <Box gap="m">
                        {exercise.sets.map((set, index) => {
                          return (
                            <Box
                              key={index}
                              flexDirection="row"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Box flex={2}>
                                <Text variant="body" color="onSurfaceContainer">
                                  {set.number} sets
                                </Text>
                              </Box>
                              <Box flex={2}>
                                <Text variant="body" color="onSurfaceContainer">
                                  {set.reps} reps
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
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>
        );
      }}
    </Pressable>
  );
}
