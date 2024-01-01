import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

export default function LocalSearchBar() {
  const [text, setText] = useState("");

  return (
    <View style={styles.inputContainer}>
      <Ionicons
        name="search-outline"
        size={25}
        color={"black"}
        style={styles.inputIcon}
      />
      <TextInput style={styles.input} onChangeText={setText} value={text} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
  inputIcon: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  input: {
    height: 50,
    width: "80%",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    paddingLeft: 40,
  },
});
