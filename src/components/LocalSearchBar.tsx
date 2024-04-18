import { Theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import TextInput from "./TextInput";
import Box from "./Box";
import { BoxProps, useTheme } from "@shopify/restyle";
import { Animated, Pressable, TextInput as RNTextInput } from "react-native";

interface LocalSearchBarProps extends BoxProps<Theme> {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  placeholder?: string;
}

export default function LocalSearchBar({
  text,
  setText,
  placeholder = "Search",
  ...props
}: LocalSearchBarProps) {
  const { colors } = useTheme<Theme>();

  const textInputRef = useRef<RNTextInput>(null);
  const isFocusedAnimated = useRef(new Animated.Value(0)).current;
  const [isFocused, setIsFocused] = useState(false);

  const textOpacity = isFocusedAnimated.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.3, 1],
  });

  const textInputContainerWidth = isFocusedAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: ["100%", "85%"],
  });

  return (
    <Box
      flexDirection="row"
      gap="s"
      alignItems="center"
      {...props}
      width="100%"
    >
      <Animated.View
        style={{
          width: textInputContainerWidth,
          backgroundColor: colors.surfaceContainer,
          borderRadius: 28,
          flexDirection: "row",
        }}
      >
        <Ionicons
          name="search-outline"
          size={22}
          color={colors.onSurface}
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            opacity: 0.75,
          }}
        />
        <TextInput
          ref={textInputRef}
          value={text}
          onChangeText={setText}
          placeholder={placeholder}
          onFocus={() => {
            setIsFocused(true);
            Animated.timing(isFocusedAnimated, {
              toValue: 1,
              duration: 250,
              useNativeDriver: false,
            }).start();
          }}
          onBlur={() => {
            Animated.timing(isFocusedAnimated, {
              toValue: 0,
              duration: 250,
              useNativeDriver: false,
            }).start((finished) => {
              if (finished) setIsFocused(false);
            });
          }}
          selectionColor={colors.primary}
          flex={1}
          height={41}
          color="onSurface"
          padding="s"
          paddingLeft="xl"
        />
      </Animated.View>
      {isFocused && (
        <Pressable
          onPress={() => {
            setText("");
            textInputRef.current?.blur();
          }}
        >
          {({ pressed }) => (
            <Box opacity={pressed ? 0.5 : 1}>
              <Animated.Text
                style={{
                  fontSize: 16,
                  color: colors.tertiary,
                  opacity: textOpacity,
                }}
              >
                Cancel
              </Animated.Text>
            </Box>
          )}
        </Pressable>
      )}
    </Box>
  );
}
