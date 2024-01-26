import { FlashList } from "@shopify/flash-list";
import Box from "./Box";
import Text from "./Text";
import { Pressable } from "react-native";
import { Dispatch, SetStateAction } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "@/constants/theme";
import { useTheme } from "@shopify/restyle";

type SelectProps<T> = {
  selected: T;
  setSelected: Dispatch<SetStateAction<T>>;
  options: T[];
};

export default function Select<T extends string>({
  selected,
  setSelected,
  options,
}: SelectProps<T>) {
  const { colors } = useTheme<Theme>();

  return (
    <FlashList
      data={options}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => setSelected(item)}
          disabled={selected === item}
        >
          {({ pressed }) => (
            <Box
              flexDirection="row"
              opacity={pressed ? 0.5 : 1}
              paddingHorizontal="m"
              justifyContent="space-between"
              alignItems="center"
              height={50}
            >
              <Text color="onSurface">{item}</Text>
              {selected === item && (
                <Ionicons name="checkmark" size={25} color={colors.primary} />
              )}
            </Box>
          )}
        </Pressable>
      )}
      estimatedItemSize={20}
    />
  );
}
