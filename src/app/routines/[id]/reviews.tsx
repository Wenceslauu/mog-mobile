import Box from "@/components/Box";
import Button from "@/components/Button";
import ReviewDraftModal from "@/components/routineDetails/ReviewDraftModal";
import RoutineReviewCard from "@/components/routineDetails/RoutineReviewCard";
import { createRandomRoutineReview } from "@/helpers/mocks/Routine";
import useModal from "@/hooks/useModal";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams } from "expo-router";

const mockedHighlightedReview = createRandomRoutineReview(true);

const mockedReviews = Array.from({ length: 10 }, createRandomRoutineReview);

export default function RoutineDetailsReviews() {
  const { id, highlightedReviewId } = useLocalSearchParams();

  const { isOpen, isOpenAnimated, toggleModal } = useModal();

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
        <Button variant="primary" onPress={toggleModal}>
          Create review
        </Button>
      </Box>
      <ReviewDraftModal
        isDraftingReview={isOpen}
        isOpenAnimated={isOpenAnimated}
        toggleDraftModal={toggleModal}
      />
    </>
  );
}
