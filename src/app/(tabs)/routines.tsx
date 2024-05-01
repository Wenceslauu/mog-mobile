import { Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, Link } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Theme } from "@/constants/theme";
import LocalSearchBar from "@/components/LocalSearchBar";
import { useTheme } from "@shopify/restyle";
import Box from "@/components/Box";
import Text from "@/components/Text";
import FilterDropdown from "@/components/FilterDropdown";
import { FlashList } from "@shopify/flash-list";
import RoutineCard from "@/components/routines/RoutineCard";
import { useScrollToTop } from "@react-navigation/native";
import {
  RoutineCategoryEnum,
  RoutineEquipmentEnum,
  RoutineDifficultyEnum,
} from "@/types/Routine";
import generateDropdownOptionsFromEnum from "@/helpers/generateDropdownOptionsFromEnum";
import { createRandomRoutinePreview } from "@/helpers/mocks/Routine";

const mockedRoutinePreviews = Array.from(
  { length: 8 },
  createRandomRoutinePreview
);

export default function RoutinesTab() {
  const [searchText, setSearchText] = useState("");
  const searchRegex = useMemo(() => new RegExp(searchText, "i"), [searchText]);

  const [category, setCategory] = useState<RoutineCategoryEnum | null>(null);
  const [equipment, setEquipment] = useState<RoutineEquipmentEnum | null>(null);
  const [difficulty, setDifficulty] = useState<RoutineDifficultyEnum | null>(
    null
  );
  // const [daysPerWeek, setDaysPerWeek] = useState<DaysPerWeek | null>(null);

  const { colors } = useTheme<Theme>();
  const navigation = useNavigation();

  const routineSectionsListRef = useRef(null);
  const searchedRoutinesListRef = useRef(null);

  // Scroll to top when the active tab is tapped
  useScrollToTop(routineSectionsListRef);
  useScrollToTop(searchedRoutinesListRef);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Link href="/create-routine" asChild>
          <Pressable>
            {({ pressed }) => (
              <Ionicons
                name="add-circle-outline"
                size={29}
                color={colors.onSurfaceContainer}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </Link>
      ),
    });
  }, [navigation, colors]);

  return (
    <Box flex={1} gap="xs" paddingTop="m" backgroundColor="surface">
      <Box alignItems="center" width="100%" zIndex={1}>
        <LocalSearchBar
          text={searchText}
          setText={setSearchText}
          placeholder="Search routines"
          paddingHorizontal="m"
        />
        <ScrollView
          horizontal={true}
          contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}
          showsHorizontalScrollIndicator={false}
        >
          <FilterDropdown<RoutineCategoryEnum>
            name="Category"
            selected={category}
            setSelected={setCategory}
            options={generateDropdownOptionsFromEnum<
              typeof RoutineCategoryEnum
            >(RoutineCategoryEnum)}
          />
          {/* <FilterDropdown<DaysPerWeek>
            name="Frequency"
            selected={daysPerWeek}
            setSelected={setDaysPerWeek}
            options={[
              {
                label: "1 day",
                value: 1,
              },
              {
                label: "2 days",
                value: 2,
              },
              {
                label: "3 days",
                value: 3,
              },
              {
                label: "4 days",
                value: 4,
              },
              {
                label: "5 days",
                value: 5,
              },
              {
                label: "6 days",
                value: 6,
              },
              {
                label: "7 days",
                value: 7,
              },
            ]}
          /> */}
          <FilterDropdown<RoutineDifficultyEnum>
            name="Difficulty"
            selected={difficulty}
            setSelected={setDifficulty}
            options={generateDropdownOptionsFromEnum<
              typeof RoutineDifficultyEnum
            >(RoutineDifficultyEnum)}
          />
          <FilterDropdown<RoutineEquipmentEnum>
            name="Equipment"
            selected={equipment}
            setSelected={setEquipment}
            options={generateDropdownOptionsFromEnum<
              typeof RoutineEquipmentEnum
            >(RoutineEquipmentEnum)}
          />
        </ScrollView>
      </Box>
      {!searchText ? (
        <ScrollView
          ref={routineSectionsListRef}
          contentContainerStyle={{ gap: 16, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
        >
          <>
            <Box gap="s">
              <Text variant="headline" color="onSurface" paddingHorizontal="m">
                Em alta
              </Text>
              <FlashList
                horizontal={true}
                keyboardDismissMode="on-drag"
                data={mockedRoutinePreviews}
                estimatedItemSize={300}
                renderItem={({ item }) => (
                  <RoutineCard routine={item} isListedHorizontally />
                )}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                ItemSeparatorComponent={() => <Box width={20} />}
                showsHorizontalScrollIndicator={false}
              />
            </Box>
            <Box gap="s">
              <Text variant="headline" color="onSurface" paddingHorizontal="m">
                Minhas rotinas
              </Text>
              <FlashList
                horizontal={true}
                keyboardDismissMode="on-drag"
                data={mockedRoutinePreviews}
                estimatedItemSize={300}
                renderItem={({ item }) => (
                  <RoutineCard routine={item} isListedHorizontally />
                )}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                ItemSeparatorComponent={() => <Box width={20} />}
                showsHorizontalScrollIndicator={false}
              />
            </Box>
          </>
        </ScrollView>
      ) : (
        <FlashList
          ref={searchedRoutinesListRef}
          keyboardDismissMode="on-drag"
          data={mockedRoutinePreviews}
          estimatedItemSize={300}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => <RoutineCard routine={item} />}
          ItemSeparatorComponent={() => <Box height={20} />}
        />
      )}
    </Box>
  );
}
