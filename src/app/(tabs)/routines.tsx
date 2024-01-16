import { Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, Link } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Theme } from "@/constants/theme";
import LocalSearchBar from "@/components/LocalSearchBar";
import { useTheme } from "@shopify/restyle";
import Box from "@/components/Box";
import Text from "@/components/Text";
import FilterDropdown from "@/components/FilterDropdown";
import { FlashList } from "@shopify/flash-list";
import RoutineCard from "@/components/routines/RoutineCard";

const mockedRoutines = [
  {
    thumbnail: require("../../../assets/images/bench-press.jpg"),
    name: "Braço de 50 cm",
    author: "wences",
    rating: 4.5,
    category: "Hypertrophy",
    difficulty: "Intermediate",
    daysPerWeek: "4 days/week",
    duration: "8 weeks",
    equipment: "Full gym",
    numberOfAthletes: 10,
  },
  {
    // thumbnail: require("../../../assets/images/squat.jpg"),
    name: "Abdomén de aço",
    author: "lui",
    rating: 3,
    category: "Hypertrophy",
    difficulty: "Intermediate",
    daysPerWeek: "4 days/week",
    duration: "12 weeks",
    equipment: "At home",
    numberOfAthletes: 2,
  },
];

export default function RoutinesScreen() {
  const [searchText, setSearchText] = useState("");
  const searchRegex = useMemo(() => new RegExp(searchText, "i"), [searchText]);

  const [category, setCategory] = useState("All");
  const [equipment, setEquipment] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [daysPerWeek, setDaysPerWeek] = useState("All");

  const { colors } = useTheme<Theme>();
  const navigation = useNavigation();

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
  }, [navigation]);

  return (
    <Box
      flex={1}
      gap="xs"
      paddingTop="m"
      paddingHorizontal="l"
      backgroundColor="surface"
    >
      <Box alignItems="center" width="100%" zIndex={1}>
        <LocalSearchBar text={searchText} setText={setSearchText} />
        <ScrollView
          horizontal={true}
          contentContainerStyle={{ gap: 8 }}
          showsHorizontalScrollIndicator={false}
          style={{ height: 70, alignSelf: "flex-start" }}
        >
          <FilterDropdown
            name="Category"
            selected={category}
            setSelected={setCategory}
            options={["Bodybuilding", "Powerlifting", "Bodyweight"]}
          />
          <FilterDropdown
            name="DaysPerWeek"
            selected={daysPerWeek}
            setSelected={setDaysPerWeek}
            options={["2 Days", "3 Days", "4 Days", "5 Days", "6 Days"]}
          />
          <FilterDropdown
            name="Difficulty"
            selected={difficulty}
            setSelected={setDifficulty}
            options={["Beginner", "Intermediate", "Advanced"]}
          />
          <FilterDropdown
            name="Equipment"
            selected={equipment}
            setSelected={setEquipment}
            options={["Full Gym", "Dumbbells Only", "At home"]}
          />
        </ScrollView>
      </Box>
      <ScrollView
        contentContainerStyle={{ gap: 16, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <Box gap="s">
          <Text variant="headline" color="onSurface">
            Em alta
          </Text>
          <FlashList
            horizontal={true}
            keyboardDismissMode="on-drag"
            data={mockedRoutines}
            estimatedItemSize={100}
            renderItem={({ item }) => <RoutineCard routine={item} />}
            ItemSeparatorComponent={() => <Box width={20} />}
            showsHorizontalScrollIndicator={false}
            style={{}}
          />
        </Box>
        <Box gap="s">
          <Text variant="headline" color="onSurface">
            Minhas rotinas
          </Text>
          <FlashList
            horizontal={true}
            keyboardDismissMode="on-drag"
            data={mockedRoutines}
            estimatedItemSize={100}
            renderItem={({ item }) => <RoutineCard routine={item} />}
            ItemSeparatorComponent={() => <Box width={20} />}
            showsHorizontalScrollIndicator={false}
          />
        </Box>
      </ScrollView>
    </Box>
  );
}
