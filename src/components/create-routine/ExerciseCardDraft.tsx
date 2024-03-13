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
import { useFieldArray, useWatch } from "react-hook-form";
import { useEffect } from "react";
import SetRowDraft from "./SetRowDraft";

type ExerciseCardDraftProps = {
  control: any;
  exerciseIndex: number;
};

export default function ExerciseCardDraft({
  control,
  exerciseIndex,
}: ExerciseCardDraftProps) {
  const { colors } = useTheme<Theme>();

  const exerciseDraft = useWatch({
    control,
    name: `exercises.${exerciseIndex}`,
  });

  const { fields, append } = useFieldArray({
    control,
    name: `exercises.${exerciseIndex}.sets` as "exercises.0.sets",
  });

  const handleAddSet = () => {
    append({
      reps: undefined,
      intensity: undefined,
    });
  };

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
            RPE
          </Text>
        </Box>
      </Box>
      <Box gap="m">
        {fields.map((field, index) => {
          return (
            <SetRowDraft
              key={field.id}
              index={index}
              control={control}
              exerciseIndex={exerciseIndex}
            />
          );
        })}
      </Box>
      <Button variant="tertiary" onPress={handleAddSet}>
        Add set
      </Button>
    </Box>
  );
}
