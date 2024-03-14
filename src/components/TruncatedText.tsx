import { LinearGradient } from "expo-linear-gradient";
import { useState, useCallback } from "react";
import {
  NativeSyntheticEvent,
  Pressable,
  TextLayoutEventData,
} from "react-native";
import Text from "@/components/Text";
import { Theme } from "@/constants/theme";
import { useTheme } from "@shopify/restyle";

const DESCRIPTION_NUM_OF_LINES = 4;

type TruncatedTextProps = {
  text: string;
};

export default function TruncatedText({ text }: TruncatedTextProps) {
  const [isTruncatedText, setIsTruncatedText] = useState(false);
  const [showMore, setShowMore] = useState(true);

  const { colors } = useTheme<Theme>();

  const onTextLayout = useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>) => {
      setIsTruncatedText(e.nativeEvent.lines.length > DESCRIPTION_NUM_OF_LINES);
    },
    []
  );

  return (
    <>
      {isTruncatedText ? (
        // TODO: Animate show more going down and gradient fading out, and vice versa
        // TODO: Add a pressed state to the text
        // TODO: First frame is showing text not truncated
        <Pressable onPress={() => setShowMore(!showMore)}>
          {({ pressed }) => (
            <>
              <Text
                variant="body"
                color="onSurface"
                paddingHorizontal="m"
                numberOfLines={showMore ? DESCRIPTION_NUM_OF_LINES : undefined}
                ellipsizeMode="tail"
                opacity={pressed ? 0.5 : 1}
              >
                {text}
              </Text>
              {showMore && (
                <LinearGradient
                  colors={[colors.surface + "00", colors.surface]}
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 48, // "body" text variant font size * 3
                  }}
                />
              )}
            </>
          )}
        </Pressable>
      ) : (
        <Text
          variant="body"
          color="onSurface"
          paddingHorizontal="m"
          onTextLayout={onTextLayout}
        >
          {text}
        </Text>
      )}
    </>
  );
}
