import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from "react-native";
import Box from "./Box";
import Text from "./Text";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";
import * as Haptics from "expo-haptics";

type SelectOption<T> = {
  label: string;
  value: T;
};

type FilterDropdownProps<T> = {
  name: string;
  selected: T | null;
  onChange: (value: T | null) => void;
  options: SelectOption<T>[];
  type?: "normal" | "filter";
};

export default function FilterDropdown<T>({
  name,
  selected,
  onChange,
  options,
  type = "filter",
}: FilterDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const isOpenAnimated = useRef(new Animated.Value(0)).current;

  const [dropdownButtonPosition, setDropdownButtonPosition] = useState({
    x: 0,
    y: 0,
  });

  const { width: windowWidth } = useWindowDimensions();

  const dropdownButtonRef = useRef<View>(null);
  const dropdownButtonWidth = useRef<number>(0);

  const { colors } = useTheme<Theme>();

  const toggleDropdown = () => {
    if (isOpen) {
      Animated.timing(isOpenAnimated, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) setIsOpen(false);
      });
    } else {
      setIsOpen(true);
      Haptics.selectionAsync();

      Animated.timing(isOpenAnimated, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  const toggleFilter = (item: T) => {
    if (selected === item) {
      if (type === "filter") onChange(null);
    } else {
      onChange(item);
    }

    toggleDropdown();
  };

  const measureDropdownButtonPosition = useCallback(() => {
    dropdownButtonRef.current?.measure(
      (_x, _y, width, height, pageX, pageY) => {
        dropdownButtonWidth.current = width;

        if (pageX < 0) {
          pageX = 0;
        } else if (pageX + width > windowWidth) {
          pageX = windowWidth - width;
        }

        setDropdownButtonPosition({ x: pageX, y: pageY });
      }
    );
  }, []);

  const backdropOpacity = isOpenAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const scale = isOpenAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const cappedHeight = useMemo(
    () => (options.length >= 6 ? 5 * 52 : (options.length - 1) * 52),
    [options]
  );

  const dropdownAnimatesToTheRight = useMemo(
    () => dropdownButtonPosition.x <= 0,
    [dropdownButtonPosition]
  );

  const dropdownAnimatesToTheLeft = useMemo(
    () => dropdownButtonPosition.x >= windowWidth - dropdownButtonWidth.current,
    [dropdownButtonPosition]
  );

  const transformArray = [
    {
      translateX: dropdownAnimatesToTheRight
        ? -90
        : dropdownAnimatesToTheLeft
        ? 90
        : 0,
    },
    { translateY: -(cappedHeight / 2) },
    { scale },
    {
      translateX: dropdownAnimatesToTheRight
        ? 110
        : dropdownAnimatesToTheLeft
        ? -135
        : 0,
    },
    { translateY: cappedHeight / 2 },
  ];

  return (
    <>
      <Pressable
        onPress={() => {
          measureDropdownButtonPosition();
          toggleDropdown();
        }}
      >
        {({ pressed }) => (
          <>
            {type === "filter" ? (
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
                backgroundColor={
                  selected != null ? "primary" : "surfaceContainer"
                }
              >
                <Text
                  variant="body"
                  color={selected != null ? "onPrimary" : "onSurface"}
                >
                  {selected == null
                    ? name
                    : options.find((option) => option.value === selected)
                        ?.label}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={28}
                  style={{ marginBottom: -3, opacity: 0.75 }}
                  color={selected != null ? colors.onPrimary : colors.onSurface}
                />
              </Box>
            ) : (
              <Box
                ref={dropdownButtonRef}
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                gap="xs"
                opacity={pressed ? 0.5 : 1}
              >
                <Text variant="label" color="onSurface">
                  {selected == null
                    ? name
                    : options.find((option) => option.value === selected)
                        ?.label}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={20}
                  style={{ opacity: 0.75 }}
                  color={colors.onSurface}
                />
              </Box>
            )}
          </>
        )}
      </Pressable>
      <Modal transparent={true} visible={isOpen}>
        <Animated.View
          style={{
            backgroundColor: colors.surfaceContainer,
            position: "absolute",
            top: dropdownButtonPosition.y - 5,
            left: dropdownButtonPosition.x - 5,
            borderRadius: 8,
            width: type === "filter" ? 180 : 120,
            height: options.length * 52,
            maxHeight: 310,
            zIndex: 1,
            transform: transformArray,
          }}
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
                      selected === item.value ? "primary" : "surfaceContainer"
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
        </Animated.View>
        <TouchableWithoutFeedback onPress={toggleDropdown}>
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              opacity: backdropOpacity,
            }}
          ></Animated.View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}
