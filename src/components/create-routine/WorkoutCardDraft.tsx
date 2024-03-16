import { Theme } from "@/constants/theme";
import { useTheme } from "@shopify/restyle";
import { Pressable } from "react-native";
import Box from "../Box";
import Text from "../Text";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useActionSheet } from "@/providers/actionSheet";
import TextInput from "../TextInput";
import { useState } from "react";
import * as Haptics from "expo-haptics";

type WorkoutCardProps = {
  name: string;
  cycleIndex: number;
  workoutIndex: number;
  handleDeleteWorkout: (cycleIndex: number, workoutIndex: number) => void;
  handleRenameWorkout: (
    name: string,
    cycleIndex: number,
    workoutIndex: number
  ) => void;
};

export default function WorkoutCardDraft({
  name,
  cycleIndex,
  workoutIndex,
  handleDeleteWorkout,
  handleRenameWorkout,
}: WorkoutCardProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(name);

  const { colors } = useTheme<Theme>();

  const { openActionSheet } = useActionSheet();

  return (
    <Link
      href={{
        pathname: "/create-routine/edit-workout",
        params: {
          cycleIndex,
          workoutIndex,
        },
      }}
      asChild
    >
      <Pressable
        onLongPress={() => {
          Haptics.selectionAsync();

          openActionSheet([
            {
              name: "Delete Workout",
              callback: () => {
                handleDeleteWorkout(cycleIndex, workoutIndex);
              },
            },
            {
              name: "Edit Workout Name",
              callback: () => {
                setEditing(true);
              },
            },
          ]);
        }}
      >
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
                {editing ? (
                  <TextInput
                    value={title}
                    onChangeText={setTitle}
                    onBlur={() => {
                      handleRenameWorkout(title, cycleIndex, workoutIndex);
                      setEditing(false);
                    }}
                    variant="title"
                    color="onSurface"
                    selectionColor={colors.primary}
                    autoFocus
                  />
                ) : (
                  <Text variant="title" color="onSurface">
                    {name}
                  </Text>
                )}
                <Ionicons
                  name="pencil-sharp"
                  size={25}
                  color={colors.onSurfaceContainer}
                />
              </Box>
            </Box>
          );
        }}
      </Pressable>
    </Link>
  );
}
