import theme from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Dispatch, SetStateAction } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useColorScheme,
} from "react-native";

type FilterDropdownProps = {
  name: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  options: string[];
};

export default function FilterDropdown({
  name,
  selected,
  setSelected,
  isOpen,
  setIsOpen,
  options,
}: FilterDropdownProps) {
  const colorScheme = useColorScheme() ?? "light";

  const styles = createStyles(colorScheme);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleFilter = (item: string) => {
    if (selected === "All" || selected !== item) {
      setSelected(item);
    } else {
      setSelected("All");
    }

    setIsOpen(false);
  };

  return (
    <>
      <Pressable onPress={toggleDropdown}>
        {({ pressed }) => (
          <View
            style={[
              styles.dropdownButton,
              selected !== "All"
                ? styles.dropDownButtonSelected
                : styles.dropdownButtonNotSelected,
              {
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          >
            <Text
              style={[
                styles.dropdownButtonText,
                {
                  color:
                    selected !== "All"
                      ? theme.colors[colorScheme].primary.on
                      : theme.colors[colorScheme].surface.on,
                },
              ]}
            >
              {selected !== "All" ? selected : name}
            </Text>
            <Ionicons
              name="chevron-down"
              size={28}
              style={{ marginBottom: -3 }}
              color={
                selected !== "All"
                  ? theme.colors[colorScheme].primary.on
                  : theme.colors[colorScheme].surface.on
              }
            />
          </View>
        )}
      </Pressable>
      {isOpen && (
        <View style={styles.dropdownMenuContainer}>
          <FlashList
            data={options}
            renderItem={({ item }) => (
              <Pressable onPress={() => toggleFilter(item)}>
                {({ pressed }) => (
                  <View
                    style={[
                      styles.dropdownMenuButton,
                      {
                        opacity: pressed ? 0.5 : 1,
                        backgroundColor:
                          selected === item
                            ? theme.colors[colorScheme].primary.main
                            : theme.colors[colorScheme].surface.container,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.dropdownMenuButtonText,
                        {
                          color:
                            selected === item
                              ? theme.colors[colorScheme].primary.on
                              : theme.colors[colorScheme].surface.onContainer,
                        },
                      ]}
                    >
                      {item}
                    </Text>
                  </View>
                )}
              </Pressable>
            )}
            estimatedItemSize={20}
          />
        </View>
      )}
    </>
  );
}

const createStyles = (colorScheme: "dark" | "light") => {
  const primary = theme.colors[colorScheme].primary.main;
  const onPrimary = theme.colors[colorScheme].primary.on;
  const onSurface = theme.colors[colorScheme].surface.on;
  const surfaceContainer = theme.colors[colorScheme].surface.container;

  return StyleSheet.create({
    dropdownButton: {
      flex: 1,
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 15,
      margin: 10,
    },
    dropDownButtonSelected: {
      backgroundColor: primary,
      borderColor: onPrimary,
    },
    dropdownButtonNotSelected: {
      backgroundColor: surfaceContainer,
      borderColor: onSurface,
    },
    dropdownButtonText: {
      fontSize: 18,
      color: onSurface,
    },

    dropdownMenuContainer: {
      backgroundColor: surfaceContainer,
      position: "absolute",
      top: 5,
      left: 5,
      borderRadius: 10,
      width: 150,
      height: 300,
    },
    dropdownMenuButton: {
      padding: 15,
      borderRadius: 10,
    },
    dropdownMenuButtonText: {
      fontSize: 18,
    },
  });
};
