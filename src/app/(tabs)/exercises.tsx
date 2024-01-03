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

  useEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <View style={{ flexDirection: "row", backgroundColor: tintColor }}>
          <Link href="/create-exercise" asChild>
            <Pressable>
              {({ pressed }) => (
                <Ionicons
                  name="add-circle-outline"
                  size={29}
                  color={theme.colors[colorScheme].surface.onSurfaceContainer}
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
                color={theme.colors[colorScheme].surface.onSurfaceContainer}
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
      <LocalSearchBar />
      <FlashList
        data={mockedExercises}
        estimatedItemSize={50}
        renderItem={({ item }) => <ExerciseCard exercise={item} />}
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{
          backgroundColor: theme.colors[colorScheme].surface.container,
        }}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheetModal>
    </DismissKeyboardView>
  );
}

type ExerciseCardProps = {
  exercise: (typeof mockedExercises)[0];
};

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

function ExerciseCard({ exercise }: ExerciseCardProps) {
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

const exerciseStyles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderColor: "white",
    borderWidth: 1,
    padding: 5,
    gap: 10,
    height: 90,
  },
  image: {
    width: "20%",
    height: "100%",
    backgroundColor: "red",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "normal",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: 1000,
    gap: 10,
    paddingTop: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
