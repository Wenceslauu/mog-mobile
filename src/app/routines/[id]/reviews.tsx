import Box from "@/components/Box";
import Button from "@/components/Button";
import ReviewDraftModal from "@/components/routineDetails/ReviewDraftModal";
import RoutineReviewCard from "@/components/routineDetails/RoutineReviewCard";
import { createRandomRoutineReview } from "@/helpers/mocks/Routine";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { Animated, Keyboard } from "react-native";

const mockedHighlightedReview = createRandomRoutineReview(true);

const mockedReviews = Array.from({ length: 10 }, createRandomRoutineReview);

export default function RoutineDetailsReviews() {
  const { id, highlightedReviewId } = useLocalSearchParams();

  const [isDraftingReview, setIsDraftingReview] = useState(false);
  const isOpenAnimated = useRef(new Animated.Value(0)).current;

  const toggleDraftModal = () => {
    if (isDraftingReview) {
      Keyboard.dismiss();
      Animated.timing(isOpenAnimated, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) setIsDraftingReview(false);
      });
    } else {
      setIsDraftingReview(true);

      Animated.timing(isOpenAnimated, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <>
      <Box flex={1} gap="m" padding="m" backgroundColor="surface">
        <FlashList
          data={
            highlightedReviewId
              ? [mockedHighlightedReview, ...mockedReviews]
              : mockedReviews
          }
          estimatedItemSize={100}
          renderItem={({ item }) => <RoutineReviewCard review={item} />}
          ItemSeparatorComponent={() => <Box height={8} />}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        />
      </Box>
      <Box
        backgroundColor="surfaceContainer"
        paddingHorizontal="m"
        paddingVertical="s"
        paddingBottom="l"
      >
        <Button variant="primary" onPress={toggleDraftModal}>
          Create review
        </Button>
      </Box>
      <ReviewDraftModal
        isDraftingReview={isDraftingReview}
        isOpenAnimated={isOpenAnimated}
        toggleDraftModal={toggleDraftModal}
      />
    </>
  );
}
