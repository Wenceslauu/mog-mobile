import Box from "../Box";
import Text from "../Text";
import { Theme } from "@/constants/theme";
import { useTheme } from "@shopify/restyle";
import TextInput from "@/components/TextInput";
import { Controller, useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import StarRating from "react-native-star-rating-widget";
import * as Haptics from "expo-haptics";

type FormData = {
  text: string;
  rating: number;
};

type ReviewDraftModalContentProps = {
  setIsDirty: Dispatch<SetStateAction<boolean>>;
};

export default function ReviewDraftModalContent({
  setIsDirty,
}: ReviewDraftModalContentProps) {
  const { colors } = useTheme<Theme>();

  const {
    control,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <>
      <Box gap="xs">
        <Text variant="label" color="onSurfaceContainer">
          Rating
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <StarRating
              rating={value}
              onChange={(rating) => {
                if (value !== rating) Haptics.selectionAsync();

                onChange(rating);
              }}
              starSize={30}
              color={colors.primary}
              emptyColor={colors.secondary}
              starStyle={{ marginHorizontal: 1 }}
            />
          )}
          name="rating"
        />
      </Box>
      <Box gap="s" minHeight={200}>
        <Text variant="label" color="onSurfaceContainer">
          Review text
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={(text) => {
                setIsDirty(!!text);

                onChange(text);
              }}
              value={value}
              selectionColor={colors.primary}
              flex={1}
              color="onSurface"
              padding="m"
              paddingTop="m"
              backgroundColor="surface"
              borderRadius="s"
              multiline
              numberOfLines={8}
              blurOnSubmit={true}
              textAlignVertical="top"
            />
          )}
          name="text"
        />
      </Box>
    </>
  );
}
