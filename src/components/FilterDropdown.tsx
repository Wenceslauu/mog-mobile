import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import { Modal, Pressable, TouchableWithoutFeedback, View } from "react-native";
import Box from "./Box";
import Text from "./Text";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";

type SelectOption<T> = {
  label: string;
  value: T;
};

type FilterDropdownProps<T> = {
  name: string;
  selected: T | null;
  setSelected: Dispatch<SetStateAction<T | null>>;
  options: SelectOption<T>[];
};

export default function FilterDropdown<T>({
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
      setSelected(null);
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
            height={55}
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            gap="s"
            borderRadius="s"
            paddingHorizontal="m"
            marginVertical="s"
            opacity={pressed ? 0.5 : 1}
            backgroundColor={selected != null ? "primary" : "surfaceContainer"}
          >
            <Text
              variant="body"
              color={selected != null ? "onPrimary" : "onSurface"}
            >
              {selected == null
                ? name
                : options.find((option) => option.value === selected)?.label}
            </Text>
            <Ionicons
              name="chevron-down"
              size={28}
              style={{ marginBottom: -3 }}
              color={selected != null ? colors.onPrimary : colors.onSurface}
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
              borderRadius="s"
              width={180}
              height={options.length * 52}
              maxHeight={310}
              zIndex={1}
            >
              <FlashList
                data={options}
                renderItem={({ item }) => (
                  <Pressable onPress={() => toggleFilter(item.value)}>
                    {({ pressed }) => (
                      <Box
                        padding="m"
                        borderRadius="s"
                        opacity={pressed ? 0.5 : 1}
                        backgroundColor={
                          selected === item.value
                            ? "primary"
                            : "surfaceContainer"
                        }
                      >
                        <Text
                          variant="body"
                          color={
                            selected === item.value
                              ? "onPrimary"
                              : "onSurfaceContainer"
                          }
                        >
                          {item.label}
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
