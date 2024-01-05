import { Image } from "expo-image";
import {
  Pressable,
  StyleSheet,
  useColorScheme,
  Text,
  View,
} from "react-native";
import { FlashList } from "@shopify/flash-list";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, Link } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import theme from "@/constants/theme";

import { BottomSheetModal } from "@gorhom/bottom-sheet";
import LocalSearchBar from "@/components/LocalSearchBar";
import FilterDropdown from "@/components/FilterDropdown";

const mockedExercises = [
  {
    image: require("../../../assets/images/bench-press.jpg"),
    name: "Bench Press",
    isFavorite: true,
    personalBest: {
      weight: 225,
      reps: 5,
    },
    targetMuscle: "Chest",
  },
  {
    image: require("../../../assets/images/squat.jpg"),
    name: "Squat",
    isFavorite: true,
    personalBest: {
      weight: 315,
      reps: 5,
    },
    targetMuscle: "Quads",
  },
  {
    // image: require("../../../assets/images/deadlift.jpg"),
    name: "Deadlift",
    isFavorite: false,
    personalBest: {
      weight: 405,
      reps: 5,
    },
    targetMuscle: "Back",
  },
  {
    // image: require("../../../assets/images/overhead-press.jpg"),
    name: "Overhead Press",
    isFavorite: false,
    personalBest: {
      weight: 135,
      reps: 5,
    },
    targetMuscle: "Shoulders",
  },
  {
    // image: require("../../../assets/images/barbell-row.jpg"),
    name: "Barbell Row",
    isFavorite: false,
    personalBest: {
      weight: 225,
      reps: 5,
    },
    targetMuscle: "Back",
  },
  {
    // image: require("../../../assets/images/pull-up.jpg"),
    name: "Pull Up",
    isFavorite: false,
    personalBest: {
      weight: 0,
      reps: 10,
    },
    targetMuscle: "Back",
  },
  {
    // image: require("../../../assets/images/dumbbell-curl.jpg"),
    name: "Dumbbell Curl",
    isFavorite: false,
    personalBest: {
      weight: 50,
      reps: 10,
    },
    targetMuscle: "Biceps",
  },
  {
    // image: require("../../../assets/images/tricep-extension.jpg"),
    name: "Tricep Extension",
    isFavorite: false,
    personalBest: {
      weight: 50,
      reps: 10,
    },
    targetMuscle: "Triceps",
  },
  {
    // image: require("../../../assets/images/leg-press.jpg"),
    name: "Leg Press",
    isFavorite: false,
    personalBest: {
      weight: 500,
      reps: 10,
    },
    targetMuscle: "Quads",
  },
  {
    // image: require("../../../assets/images/leg-curl.jpg"),
    name: "Leg Curl",
    isFavorite: false,
    personalBest: {
      weight: 200,
      reps: 10,
    },
    targetMuscle: "Hamstrings",
  },
  {
    // image: require("../../../assets/images/calf-raise.jpg"),
    name: "Calf Raise",
    isFavorite: false,
    personalBest: {
      weight: 200,
      reps: 10,
    },
    targetMuscle: "Calves",
  },
  {
    // image: require("../../../assets/images/crunch.jpg"),
    name: "Crunch",
    isFavorite: false,
    personalBest: {
      weight: 0,
      reps: 25,
    },
    targetMuscle: "Abs",
  },
  {
    // image: require("../../../assets/images/leg-raise.jpg"),
    name: "Leg Raise",
    isFavorite: false,
    personalBest: {
      weight: 0,
      reps: 25,
    },
    targetMuscle: "Abs",
  },
  {
    // image: require("../../../assets/images/plank.jpg"),
    name: "Plank",
    isFavorite: false,
    personalBest: {
      weight: 0,
      reps: 120,
    },
    targetMuscle: "Abs",
  },
  {
    // image: require("../../../assets/images/dumbbell-press.jpg"),
    name: "Dumbbell Press",
    isFavorite: false,
    personalBest: {
      weight: 50,
      reps: 10,
    },
    targetMuscle: "Chest",
  },
  {
    // image: require("../../../assets/images/dumbbell-fly.jpg"),
    name: "Dumbbell Fly",
    isFavorite: false,
    personalBest: {
      weight: 50,
      reps: 10,
    },
    targetMuscle: "Chest",
  },
  {
    // image: require("../../../assets/images/dumbbell-lateral-raise.jpg"),
    name: "Dumbbell Lateral Raise",
    isFavorite: false,
    personalBest: {
      weight: 30,
      reps: 10,
    },
    targetMuscle: "Shoulders",
  },
  {
    // image: require("../../../assets/images/dumbbell-rear-delt-fly.jpg"),
    name: "Dumbbell Rear Delt Fly",
    isFavorite: false,
    personalBest: {
      weight: 30,
      reps: 10,
    },
    targetMuscle: "Shoulders",
  },
];

export default function ExercisesScreen() {
  const [searchText, setSearchText] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [targetMuscle, setTargetMuscle] = useState("All");

  const colorScheme = useColorScheme() ?? "light";
  const navigation = useNavigation();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const styles = createStyles(colorScheme);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <Link href="/create-exercise" asChild>
            <Pressable>
              {({ pressed }) => (
                <Ionicons
                  name="add-circle-outline"
                  size={29}
                  color={theme.colors[colorScheme].surface.onContainer}
                  style={{ marginRight: 8, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
          <Pressable onPress={handlePresentModalPress}>
            {({ pressed }) => (
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={29}
                color={theme.colors[colorScheme].surface.onContainer}
                style={{
                  marginRight: 15,
                  marginTop: 1,
                  opacity: pressed ? 0.5 : 1,
                }}
              />
            )}
          </Pressable>
        </View>
      ),
    });
  }, [navigation]);

  const searchRegex = useMemo(() => new RegExp(searchText, "i"), [searchText]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <LocalSearchBar text={searchText} setText={setSearchText} />
        <View style={styles.dropdownContainer}>
          <FilterDropdown
            name="Muscle Group"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            selected={targetMuscle}
            setSelected={setTargetMuscle}
            options={[
              "Chest",
              "Back",
              "Quads",
              "Hamstrings",
              "Calves",
              "Abs",
              "Shoulders",
              "Biceps",
              "Triceps",
            ]}
          />
        </View>
      </View>
      <FlashList
        keyboardDismissMode="on-drag"
        data={mockedExercises.filter(
          (exercise) =>
            searchRegex.test(exercise.name) &&
            (targetMuscle === "All" || exercise.targetMuscle === targetMuscle)
        )}
        estimatedItemSize={50}
        renderItem={({ item }) => <ExerciseCard exercise={item} />}
        contentContainerStyle={{ paddingHorizontal: 30, paddingBottom: 30 }}
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={["25%", "50%"]}
        onChange={handleSheetChanges}
        backgroundStyle={{
          backgroundColor: theme.colors[colorScheme].surface.container,
        }}
        handleIndicatorStyle={{
          backgroundColor: theme.colors[colorScheme].surface.onContainer,
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Awesome 🎉</Text>
        </View>
      </BottomSheetModal>
    </View>
  );
}

const createStyles = (colorScheme: "dark" | "light") => {
  return StyleSheet.create({
    container: {
      flex: 1,
      gap: 15,
      paddingTop: 10,
      
      backgroundColor: theme.colors[colorScheme].surface.main,
    },
    searchContainer: {
      alignItems: "center",
      width: "100%",
      zIndex: 1,
    },
    dropdownContainer: {
      height: 70,
      alignSelf: "flex-start",
    },
    modalContainer: {
      flex: 1,
      alignItems: "center",
    },
    modalText: {
      fontSize: 22,
      fontWeight: "bold",
      color: theme.colors[colorScheme].surface.onContainer,
    },
  });
};

type ExerciseCardProps = {
  exercise: (typeof mockedExercises)[0];
};

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

function ExerciseCard({ exercise }: ExerciseCardProps) {
  const colorScheme = useColorScheme() ?? "light";

  const exerciseStyles = createExerciseStyles(colorScheme);

  return (
    <View style={exerciseStyles.cardContainer}>
      <Image
        style={exerciseStyles.image}
        source={exercise.image}
        placeholder={blurhash}
      />
      <View style={exerciseStyles.cardContent}>
        <View style={exerciseStyles.leftContainer}>
          <Text style={exerciseStyles.title}>{exercise.name}</Text>
          <Text style={exerciseStyles.subtitle}>{exercise.targetMuscle}</Text>
        </View>
        <View style={exerciseStyles.rightContainer}>
          <View style={exerciseStyles.personalBestContainer}>
            <Text style={exerciseStyles.personalBestText}>
              {exercise.personalBest.weight} kg - {exercise.personalBest.reps}
            </Text>
          </View>
          <Pressable
            onPress={() => console.log("FAVORITE")}
            style={exerciseStyles.icon}
          >
            {({ pressed }) => (
              <Ionicons
                name={`bookmark${exercise.isFavorite ? "" : "-outline"}`}
                size={29}
                color={theme.colors[colorScheme].surface.on}
                style={{
                  opacity: pressed ? 0.5 : 1,
                }}
              />
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const createExerciseStyles = (colorScheme: "dark" | "light") => {
  return StyleSheet.create({
    cardContainer: {
      flexDirection: "row",
      gap: 10,
      height: 90,
      padding: 5,
      paddingRight: 10,
      borderWidth: 1,
      borderColor: theme.colors[colorScheme].outline.main,
    },
    image: {
      width: "20%",
      backgroundColor: theme.colors[colorScheme].secondary.main,
    },
    cardContent: {
      flex: 1,
      flexDirection: "row",
    },
    leftContainer: {
      alignSelf: "flex-start",
      flex: 1,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.colors[colorScheme].surface.on,
    },
    subtitle: {
      fontSize: 16,
      fontWeight: "normal",
      color: theme.colors[colorScheme].surface.on,
    },
    rightContainer: {
      flexDirection: "row",
      gap: 10,
    },
    personalBestContainer: {
      alignSelf: "flex-end",
    },
    personalBestText: {
      fontSize: 16,
      fontWeight: "normal",
      color: theme.colors[colorScheme].surface.on,
    },
    icon: {
      alignSelf: "center",
    },
  });
};
