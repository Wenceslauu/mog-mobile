import { Ionicons } from "@expo/vector-icons";
import { Link, useNavigation } from "expo-router";
import { Platform, Pressable } from "react-native";
import Box from "../Box";
import Text from "../Text";
import { ExerciseLogIsolated, SetLog } from "@/types/Log";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";
import dayjs from "@/lib/dayjs";
import { EnduranceCriteriaEnum } from "@/types/Exercise";

type ExerciseLogCardProps = {
  exerciseLog: ExerciseLogIsolated;
};

export default function ExerciseLogCard({ exerciseLog }: ExerciseLogCardProps) {
  const { colors } = useTheme<Theme>();

  const navigation = useNavigation();

  return (
    <Box gap="s" padding="m" backgroundColor="surfaceContainer">
      <Link
        href={{
          pathname: `/posts/${exerciseLog.post.id}`,
        }}
        asChild
      >
        <Pressable
          onPress={() => {
            // TODO: Persist navigation state
            // navigation.getParent()?.goBack();

            // https://stackoverflow.com/a/75758827
            // Close modal(s) when navigating to a non-modal screen
            if (Platform.OS === "ios")
              navigation.dispatch({ type: "POP_TO_TOP" });
          }}
        >
          {({ pressed }) => (
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box gap="s" opacity={pressed ? 0.5 : 1}>
                <Text variant="title" color="onSurface">
                  {exerciseLog.workoutLog.workout?.name}
                </Text>
                <Text variant="label" color="onSurface">
                  {dayjs(exerciseLog.workoutLog.loggedAt).format("L")}
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
