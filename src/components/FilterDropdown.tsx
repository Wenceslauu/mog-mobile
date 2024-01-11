import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Dispatch, SetStateAction } from "react";
import { Pressable } from "react-native";
import Box from "./Box";
import Text from "./Text";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";

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
  const { colors } = useTheme<Theme>();

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
          <Box
            flex={1}
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            gap="s"
            borderWidth={1}
            borderRadius={10}
            paddingHorizontal="m"
            margin="s"
            opacity={pressed ? 0.5 : 1}
            backgroundColor={
              selected !== "All" ? "primary" : "surfaceContainer"
            }
            borderColor={selected !== "All" ? "onPrimary" : "onSurface"}
          >
            <Text
              variant="body"
              color={selected !== "All" ? "onPrimary" : "onSurface"}
            >
              {selected !== "All" ? selected : name}
            </Text>
            <Ionicons
              name="chevron-down"
              size={28}
              style={{ marginBottom: -3 }}
              color={selected !== "All" ? colors.onPrimary : colors.onSurface}
            />
          </Box>
        )}
      </Pressable>
      {isOpen && (
        <Box
          backgroundColor="surfaceContainer"
          position="absolute"
          top={5}
          left={5}
          borderRadius={10}
          width={150}
          height={300}
        >
          <FlashList
            data={options}
            renderItem={({ item }) => (
              <Pressable onPress={() => toggleFilter(item)}>
                {({ pressed }) => (
                  <Box
                    padding="m"
                    borderRadius={10}
                    opacity={pressed ? 0.5 : 1}
                    backgroundColor={
                      selected === item ? "primary" : "surfaceContainer"
                    }
                  >
                    <Text
                      variant="body"
                      color={
                        selected === item ? "onPrimary" : "onSurfaceContainer"
                      }
                    >
                      {item}
                    </Text>
                  </Box>
                )}
              </Pressable>
            )}
            estimatedItemSize={20}
          />
        </Box>
      )}
    </>
  );
}
