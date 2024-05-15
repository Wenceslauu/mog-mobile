import blurhash from "@/constants/blurhash";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import Box from "../Box";
import Text from "../Text";
import { Image } from "expo-image";
import { ExerciseLog, SetLog } from "@/types/Log";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";
import { EnduranceCriteriaEnum } from "@/types/Exercise";
import dayjs from "@/lib/dayjs";

type ExerciseLogCardProps = {
  exerciseLog: ExerciseLog;
};

export default function ExerciseLogCard({ exerciseLog }: ExerciseLogCardProps) {
  const { colors } = useTheme<Theme>();

  return (
    <Box gap="s" padding="m" backgroundColor="surfaceContainer">
      <Link
        href={{
          pathname: `/exercises/${exerciseLog.exercise.id}`,
          params: { name: exerciseLog.exercise.name },
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
                  source={exerciseLog.exercise.image}
                  placeholder={blurhash}
                  style={{
                    width: 50,
                    height: 50,
                  }}
                />
                <Text variant="title" color="onSurface">
                  {exerciseLog.exercise.name}
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
            {[
              EnduranceCriteriaEnum.Reps,
              EnduranceCriteriaEnum["Reps Range"],
              EnduranceCriteriaEnum.AMRAP,
            ].includes(exerciseLog.enduranceCriteria)
              ? "Reps"
              : exerciseLog.enduranceCriteria === EnduranceCriteriaEnum.Time
              ? "Time"
              : null}
          </Text>
        </Box>
        <Box flex={1}>
          <Text variant="label" color="onSurface">
            Weight
          </Text>
        </Box>
      </Box>
      <Box gap="m">
        {exerciseLog.sets.map((set, index) => {
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
                  {renderEndurance(exerciseLog.enduranceCriteria, set)}
                </Text>
              </Box>
              <Box flex={1}>
                <Text variant="body" color="onSurfaceContainer">
                  {set.weight} kg
                </Text>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

const renderEndurance = (
  enduranceCriteria: EnduranceCriteriaEnum,
  set: SetLog
) => {
  switch (enduranceCriteria) {
    case EnduranceCriteriaEnum.Reps:
    case EnduranceCriteriaEnum["Reps Range"]:
    case EnduranceCriteriaEnum.AMRAP:
      return `${set.reps} reps`;
    case EnduranceCriteriaEnum.Time:
      return dayjs.duration(set.time ?? 0, "s").format("mm:ss");
    default:
      return null;
  }
};
