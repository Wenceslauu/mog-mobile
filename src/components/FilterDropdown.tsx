import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import { Modal, Pressable, TouchableWithoutFeedback, View } from "react-native";
import Box from "./Box";
import Text from "./Text";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";

type FilterDropdownProps<T> = {
  name: string;
  selected: T;
  setSelected: Dispatch<SetStateAction<T>>;
  options: T[];
};

export default function FilterDropdown<T extends string | null>({
  name,
  selected,
  setSelected,
  options,
}: FilterDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const [dropdownButtonPosition, setDropdownButtonPosition] = useState({
    x: 0,
    y: 0,
  });

  const dropdownButtonRef = useRef<View>(null);

  const { colors } = useTheme<Theme>();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleFilter = (item: T) => {
    if (selected === item) {
      setSelected(null as T);
    } else {
      setSelected(item);
    }

    setIsOpen(false);
  };

  const measureDropdownButtonPosition = useCallback(() => {
    dropdownButtonRef.current?.measure(
      (_x, _y, width, height, pageX, pageY) => {
        if (pageX < 4) {
          pageX = 4;
        } else if (pageX > 240) {
          pageX = 240;
        }

        setDropdownButtonPosition({ x: pageX, y: pageY });
      }
    );
  }, []);

  return (
    <>
      <Pressable
        onPress={() => {
          measureDropdownButtonPosition();
          toggleDropdown();
        }}
      >
        {({ pressed }) => (
          <Box
            ref={dropdownButtonRef}
            flex={1}
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            gap="s"
            borderWidth={1}
            borderRadius={10}
            paddingHorizontal="m"
            marginVertical="s"
            opacity={pressed ? 0.5 : 1}
            backgroundColor={selected ? "primary" : "surfaceContainer"}
            borderColor={selected ? "onPrimary" : "onSurface"}
          >
            <Text variant="body" color={selected ? "onPrimary" : "onSurface"}>
              {selected ? selected : name}
            </Text>
            <Ionicons
              name="chevron-down"
              size={28}
              style={{ marginBottom: -3 }}
              color={selected ? colors.onPrimary : colors.onSurface}
            />
          </Box>
        )}
      </Pressable>
      {isOpen && (
        <>
          <Modal transparent={true}>
            <Box
              backgroundColor="surfaceContainer"
              position="absolute"
              top={dropdownButtonPosition.y - 5}
              left={dropdownButtonPosition.x - 5}
              borderRadius={10}
              width={180}
              height={options.length * 52}
              maxHeight={310}
              zIndex={1}
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
                            selected === item
                              ? "onPrimary"
                              : "onSurfaceContainer"
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
            <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
              <Box
                position="absolute"
                left={0}
                right={0}
                top={0}
                bottom={0}
                opacity={0.5}
                style={{ backgroundColor: "rgb(0, 0, 0)" }}
              ></Box>
            </TouchableWithoutFeedback>
          </Modal>
        </>
      )}
    </>
  );
}
