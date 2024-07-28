import { Pressable } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, Link } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";

import LocalSearchBar from "@/components/LocalSearchBar";
import FilterDropdown from "@/components/FilterDropdown";

import Box from "@/components/Box";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";
import ExerciseCard from "@/components/exercises/ExerciseCard";
import { useScrollToTop } from "@react-navigation/native";
import { useActionSheet } from "@/providers/actionSheet";
import { ExerciseTargetMuscleEnum } from "@/types/Exercise";
import generateDropdownOptionsFromEnum from "@/helpers/generateDropdownOptionsFromEnum";
import { createRandomExercisePreview } from "@/helpers/mocks/Exercise";

const mockedExercisePreviews = Array.from(
  { length: 20 },
  createRandomExercisePreview
);

export default function ExercisesTab() {
  const [searchText, setSearchText] = useState("");
  const searchRegex = useMemo(() => new RegExp(searchText, "i"), [searchText]);

  const [targetMuscle, setTargetMuscle] =
    useState<ExerciseTargetMuscleEnum | null>(null);

  const { openActionSheet } = useActionSheet();

  const { colors } = useTheme<Theme>();
  const navigation = useNavigation();

  const exercisesListRef = useRef(null);

  // Scroll to top when the active tab is tapped
  useScrollToTop(exercisesListRef);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Box flexDirection="row">
          <Link href="/create-edit-exercise" asChild>
            <Pressable>
              {({ pressed }) => (
                <Ionicons
                  name="add-circle-outline"
                  size={29}
                  color={colors.onSurfaceContainer}
                  style={{ marginRight: 8, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
          <Pressable
            onPress={() => {
              openActionSheet([
                {
                  name: "Change achievement in display",
                  callback: () => console.log("Change achievement in display"),
                },
              ]);
            }}
          >
            {({ pressed }) => (
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={29}
                color={colors.onSurfaceContainer}
                style={{
                  marginRight: 15,
                  marginTop: 1,
                  opacity: pressed ? 0.5 : 1,
                }}
              />
            )}
          </Pressable>
        </Box>
      ),
    });
  }, [navigation, colors]);

  return (
    <>
      <Box flex={1} gap="xs" paddingTop="m" backgroundColor="surface">
        <Box alignItems="center" width="100%" zIndex={1} paddingHorizontal="m">
          <LocalSearchBar
            text={searchText}
            setText={setSearchText}
            placeholder="Search exercises"
          />
          <Box alignSelf="flex-start">
            <FilterDropdown<ExerciseTargetMuscleEnum>
              name="Muscle Group"
              selected={targetMuscle}
              setSelected={setTargetMuscle}
              options={generateDropdownOptionsFromEnum<
                typeof ExerciseTargetMuscleEnum
              >(ExerciseTargetMuscleEnum)}
            />
          </Box>
        </Box>
        <FlashList
          ref={exercisesListRef}
          keyboardDismissMode="on-drag"
          data={mockedExercisePreviews.filter(
            (exercise) =>
              searchRegex.test(exercise.name) &&
              (!targetMuscle || exercise.targetMuscle === targetMuscle)
          )}
          estimatedItemSize={106}
          renderItem={({ item }) => <ExerciseCard exercise={item} />}
          ItemSeparatorComponent={() => <Box height={4} />}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </Box>
    </>
  );
}
