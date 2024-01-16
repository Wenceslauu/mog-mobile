import { Image } from "expo-image";
import { Pressable, ScrollView } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation, Link } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Theme } from "@/constants/theme";
import LocalSearchBar from "@/components/LocalSearchBar";
import DismissKeyboardView from "@/components/DismissKeyboardView";
import { useTheme } from "@shopify/restyle";
import Box from "@/components/Box";
import Text from "@/components/Text";
import FilterDropdown from "@/components/FilterDropdown";
import { FlashList } from "@shopify/flash-list";

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
        <Box height={70} alignSelf="flex-start">
          <FilterDropdown
            name="Category"
            selected={category}
            setSelected={setCategory}
            options={["Bodybuilding", "Powerlifting", "Bodyweight"]}
          />
        </Box>
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

type RoutineCardProps = {
  routine: (typeof mockedRoutines)[0];
};

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

function RoutineCard({ routine }: RoutineCardProps) {
  return (
    <Box borderRadius={30} width={300}>
      <Image
        source={routine.thumbnail}
        placeholder={blurhash}
        style={{
          width: "100%",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: 200,
        }}
      />
      <Box
        backgroundColor="surfaceContainer"
        padding="m"
        paddingBottom="l"
        paddingTop="s"
        gap="m"
        borderBottomLeftRadius={30}
        borderBottomRightRadius={30}
      >
        <Box gap="xs">
          <Text variant="title" color="onSurface">
            {routine.name}
          </Text>
          <Box flexDirection="row" justifyContent="space-between">
            <Text variant="body" color="onSurfaceContainer">
              {routine.author}
            </Text>
            <Text variant="body" color="onSurfaceContainer">
              {routine.numberOfAthletes} atletas
            </Text>
          </Box>
        </Box>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        >
          <Box
            backgroundColor="primary"
            padding="xs"
            paddingHorizontal="s"
            borderRadius={6}
          >
            <Text variant="body" color="onPrimary">
              {routine.category}
            </Text>
          </Box>
          <Box
            backgroundColor="primary"
            padding="xs"
            paddingHorizontal="s"
            borderRadius={6}
          >
            <Text variant="body" color="onPrimary">
              {routine.daysPerWeek}
            </Text>
          </Box>
          <Box
            backgroundColor="primary"
            padding="xs"
            paddingHorizontal="s"
            borderRadius={6}
          >
            <Text variant="body" color="onPrimary">
              {routine.difficulty}
            </Text>
          </Box>
          <Box
            backgroundColor="primary"
            padding="xs"
            paddingHorizontal="s"
            borderRadius={6}
          >
            <Text variant="body" color="onPrimary">
              {routine.equipment}
            </Text>
          </Box>
          <Box
            backgroundColor="primary"
            padding="xs"
            paddingHorizontal="s"
            borderRadius={6}
          >
            <Text variant="body" color="onPrimary">
              {routine.duration}
            </Text>
          </Box>
        </ScrollView>
      </Box>
    </Box>
  );
}
