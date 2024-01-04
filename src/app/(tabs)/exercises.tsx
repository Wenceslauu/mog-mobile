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
import { useCallback, useEffect, useMemo, useRef } from "react";
import theme from "@/constants/theme";

import { BottomSheetModal } from "@gorhom/bottom-sheet";
import DismissKeyboardView from "@/components/DismissKeyboardView";
import LocalSearchBar from "@/components/LocalSearchBar";

const mockedExercises = [
  {
    image: require("../../../assets/images/bench-press.jpg"),
    name: "Bench Press",
    isFavorite: false,
    personalBest: {
      weight: 225,
      reps: 5,
    },
    targetMuscle: "Chest",
  },
  {
    image: require("../../../assets/images/squat.jpg"),
    name: "Squat",
    isFavorite: false,
    personalBest: {
      weight: 315,
      reps: 5,
    },
    targetMuscle: "Quads",
  },
];

export default function ExercisesScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const navigation = useNavigation();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["25%", "50%"], []);

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

  return (
    <DismissKeyboardView style={styles.container}>
      <View style={styles.searchContainer}>
        <LocalSearchBar />
      </View>
      <FlashList
        data={mockedExercises}
        estimatedItemSize={50}
        renderItem={({ item }) => <ExerciseCard exercise={item} />}
        contentContainerStyle={{ paddingTop: 10, padding: 30 }}
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
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
    </DismissKeyboardView>
  );
}

const createStyles = (colorScheme: "dark" | "light") => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
      backgroundColor: theme.colors[colorScheme].surface.main,
    },
    searchContainer: {
      alignItems: "center",
      width: "100%",
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
      <View>
        <Text style={exerciseStyles.title}>{exercise.name}</Text>
        <Text style={exerciseStyles.subtitle}>{exercise.targetMuscle}</Text>
      </View>
    </View>
  );
}

const createExerciseStyles = (colorScheme: "dark" | "light") => {
  return StyleSheet.create({
    cardContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: 10,
      height: 90,
      padding: 5,
      borderWidth: 1,
      borderColor: theme.colors[colorScheme].outline.main,
    },
    image: {
      width: "20%",
      height: "100%",
      backgroundColor: theme.colors[colorScheme].secondary.main,
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
  });
};
