import { Pressable, StyleSheet, TextInput, useColorScheme } from "react-native";

import { Text, View } from "@/components/Themed";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, Link } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Colors from "@/constants/Colors";

import { BottomSheetModal } from "@gorhom/bottom-sheet";
import DismissKeyboardView from "@/components/DismissKeyboardView";
import LocalSearchBar from "@/components/LocalSearchBar";

export default function ExercisesScreen() {
  const colorScheme = useColorScheme();
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
                  color={Colors[colorScheme ?? "light"].text}
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
                color={Colors[colorScheme ?? "light"].text}
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
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{
          backgroundColor: Colors[colorScheme ?? "light"].background,
        }}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheetModal>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
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
