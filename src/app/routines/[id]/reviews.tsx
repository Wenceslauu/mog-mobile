import Box from "@/components/Box";
import Button from "@/components/Button";
import RoutineReviewCard from "@/components/routines/RoutineReviewCard";
import { FlashList } from "@shopify/flash-list";

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
  return (
    <>
      <Box flex={1} gap="m" padding="m" backgroundColor="surface">
        <FlashList
          data={mockedReviews}
          estimatedItemSize={100}
          renderItem={({ item }) => <RoutineReviewCard review={item} />}
          ItemSeparatorComponent={() => <Box height={8} />}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      </Box>
      <Box
        backgroundColor="surfaceContainer"
        paddingHorizontal="m"
        paddingVertical="s"
        paddingBottom="l"
      >
        <Button variant="primary" onPress={() => console.log("Create review")}>
          Create review
        </Button>
      </Box>
    </>
  );
}
