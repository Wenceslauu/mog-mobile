import theme from "@/constants/theme";
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
              styles.dropdown,
              {
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          >
            <Text style={styles.dropdownText}>{name}</Text>
          </View>
        )}
      </Pressable>
      {isOpen && (
        <View style={styles.dropdownContainer}>
          <FlashList
            data={options}
            renderItem={({ item }) => (
              <Pressable onPress={() => toggleFilter(item)}>
                {({ pressed }) => (
                  <View
                    style={[
                      styles.button,
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
                        styles.buttonText,
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
  return StyleSheet.create({
    dropdown: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: theme.colors[colorScheme].surface.on,
      borderRadius: 10,
      paddingHorizontal: 15,
      margin: 10,
    },
    dropdownText: {
      fontSize: 18,
      color: theme.colors[colorScheme].surface.on,
    },
    dropdownContainer: {
      backgroundColor: theme.colors[colorScheme].surface.container,
      position: "absolute",
      top: 5,
      left: 5,
      borderRadius: 10,
      width: 150,
      height: 300,
    },
    button: {
      padding: 15,
      borderRadius: 10,
    },
    buttonText: {
      fontSize: 18,
    },
  });
};
