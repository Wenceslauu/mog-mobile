import { Theme } from "@/constants/theme";
import { Workout, WorkoutSet } from "@/types/Routine";
import { useTheme } from "@shopify/restyle";
import { useEffect, useState } from "react";
import { Pressable } from "react-native";
import Box from "../Box";
import Text from "../Text";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import blurhash from "@/constants/blurhash";
import { Link } from "expo-router";
import { EnduranceCriteriaEnum, IntensityCriteriaEnum } from "@/types/Exercise";
import dayjs from "@/lib/dayjs";

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
                      <Link
                        href={{
                          pathname: `/exercises/${exercise.exercise.id}`,
                          params: { name: exercise.exercise.name },
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
                                  source={exercise.exercise.image}
                                  placeholder={blurhash}
                                  style={{
                                    width: 50,
                                    height: 50,
                                  }}
                                />
                                <Text variant="title" color="onSurface">
                                  {exercise.exercise.name}
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
                      <Box gap="m">
                        {exercise.sets.map((set, index) => {
                          return (
                            <Box
                              key={index}
                              flexDirection="row"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Box flex={1}>
                                <Text variant="body" color="onSurfaceContainer">
                                  {"todo"} sets
                                </Text>
                              </Box>
                              <Box flex={1}>
                                <Text variant="body" color="onSurfaceContainer">
                                  {renderEndurance(
                                    exercise.enduranceCriteria,
                                    set
                                  )}
                                </Text>
                              </Box>
                              <Box flex={1}>
                                <Text variant="body" color="onSurfaceContainer">
                                  {renderIntensity(
                                    exercise.intensityCriteria,
                                    set
                                  )}
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

const renderEndurance = (
  enduranceCriteria: EnduranceCriteriaEnum,
  set: WorkoutSet
) => {
  switch (enduranceCriteria) {
    case EnduranceCriteriaEnum.Reps:
      return `${set.minReps} reps`;
    case EnduranceCriteriaEnum["Reps Range"]:
      return `${set.minReps} - ${set.maxReps} reps`;
    case EnduranceCriteriaEnum.Time:
      return dayjs.duration(set.targetTime ?? 0, "s").format("mm:ss");
    case EnduranceCriteriaEnum.AMRAP:
      return "AMRAP";
    default:
      return null;
  }
};

const renderIntensity = (
  intensityCriteria: IntensityCriteriaEnum,
  set: WorkoutSet
) => {
  switch (intensityCriteria) {
    case IntensityCriteriaEnum.RPE:
      return `RPE ${set.rpe}`;
    case IntensityCriteriaEnum["% of 1RM"]:
      return `${set.prPercentage}% of 1RM`;
    default:
      return null;
  }
};
