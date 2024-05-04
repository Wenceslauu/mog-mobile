import Box from "@/components/Box";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import ReviewDraftModalContent from "@/components/routineDetails/ReviewDraftModalContent";
import RoutineReviewCard from "@/components/routineDetails/RoutineReviewCard";
import { createRandomRoutineReview } from "@/helpers/mocks/Routine";
import useModal from "@/hooks/useModal";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

const mockedHighlightedReview = createRandomRoutineReview(true);

const mockedReviews = Array.from({ length: 10 }, createRandomRoutineReview);

export default function RoutineDetailsReviews() {
  const { id, highlightedReviewId } = useLocalSearchParams();

  const { isOpen, isOpenAnimated, toggleModal } = useModal();

  // isDirty is a state here so as to rerender the modal with the updated locked state
  const [isDirty, setIsDirty] = useState(false);

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
      <Modal
        title="Create review"
        isLocked={isDirty}
        isOpen={isOpen}
        isOpenAnimated={isOpenAnimated}
        toggleModal={toggleModal}
        contentComponent={() => (
          <ReviewDraftModalContent setIsDirty={setIsDirty} />
        )}
      />
    </>
  );
}
