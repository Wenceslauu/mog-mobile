import Box from "@/components/Box";
import Button from "@/components/Button";
import ReviewDraftModal from "@/components/routineDetails/ReviewDraftModal";
import RoutineReviewCard from "@/components/routineDetails/RoutineReviewCard";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { Animated, Keyboard } from "react-native";

const mockedHighlightedReview = {
  id: 4,
  rating: 5,
  text: "Não estou mais passando pelas portas",
  date: new Date(2024, 1, 2),
  author: {
    id: 1,
    name: "Wenceslauu",
    picture: "https://unavatar.io/github/Wenceslauu",
  },
  highlighted: true,
};

const mockedReviews = [
  {
    id: 1,
    rating: 5,
    text: "Muito bom, recomendo",
    date: new Date(2024, 1, 10),
    author: {
      id: 1,
      name: "Wenceslauu",
      picture: "https://unavatar.io/github/Wenceslauu",
    },
  },
  {
    id: 2,
    rating: 3.5,
    text: "Sei lá, meio paia",
    date: new Date(2024, 1, 10),
    author: {
      id: 2,
      name: "Lui",
      picture: "https://unavatar.io/github/pedroandrade03",
    },
  },
  {
    id: 3,
    rating: 5,
    text: "TOP DEMAIS! A MELHOR DIVISÃO QUE EU JÁ SEGUI NA VIDA! RECOMENDO DEMAIS! MUITO OBRIGADO POR COMPARTILHAR ESSA ROTINA! <3 <3 <3. MUITO BOM PELOS SEGUINTES MOTIVOS: 1. A divisão é muito bem estruturada, com um volume de treino adequado para cada grupo muscular. 2. A divisão é muito bem estruturada, com um volume de treino adequado para cada grupo muscular. 3. A divisão é muito bem estruturada, com um volume de treino adequado para cada grupo muscular.",
    date: new Date(2024, 1, 10),
    author: {
      id: 2,
      name: "Thigas",
      picture: "https://unavatar.io/github/pedroandrade03",
    },
  },
];

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
