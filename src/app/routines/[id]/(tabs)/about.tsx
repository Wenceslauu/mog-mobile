import Avatar from "@/components/Avatar";
import Box from "@/components/Box";
import Text from "@/components/Text";
import RoutineReviewCard from "@/components/routineDetails/RoutineReviewCard";
import { Theme } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { FlashList } from "@shopify/flash-list";
import { useTheme } from "@shopify/restyle";
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
} from "react-native";
import Table from "@/components/Table";
import TruncatedText from "@/components/TruncatedText";
import { Link, useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { ScrollingContext } from "@/contexts/scrolling";
import TABVIEW_HEADER_HEIGHT from "@/constants/tabViewHeaderHeight";
import PARALLAX_HEADER_MAX_HEIGHT from "@/constants/parallaxHeaderMaxHeight";

const mockedRoutine = {
  id: 1,
  // thumbnail: require("../../../assets/images/bench-press.jpg"),
  name: "Braço de 50 cm",
  author: {
    id: 1,
    name: "wences",
    picture: "https://unavatar.io/github/Wenceslauu",
  },
  category: "Hypertrophy",
  difficulty: "Intermediate",
  daysPerWeek: "4 days/week",
  duration: "8 weeks",
  equipment: "Full gym",
  numberOfAthletes: 10,
  description:
    "Esse é um programa destinado a transformar os seus bracinhos em membros de um mutante. Aqui os seus bíceps serão esmagados, os seus tríceps serão completamente esmagados, sem dó nem piedade. Prepare-se para o braço de 50 cm!",
  rating: 4.5,
  numberOfReviews: 48,
  reviews: [
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
  ],
};

export default function RoutineDetailsAboutTab() {
  const { id } = useLocalSearchParams();

  const { scrollY, scrollViewRefs } = useContext(ScrollingContext);

  const aboutScrollViewRef = scrollViewRefs![0];
  const workoutsScrollViewRef = scrollViewRefs![1];

  const { colors } = useTheme<Theme>();

  const keepScrollViewsInSync = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    workoutsScrollViewRef.current?.scrollTo({
      y: event.nativeEvent.contentOffset.y,
      animated: false,
    });
  };

  return (
    <Animated.ScrollView
      ref={aboutScrollViewRef}
      contentContainerStyle={{
        gap: 16,
        paddingBottom: 100,
        marginTop: TABVIEW_HEADER_HEIGHT - 16, // 16 is approximately the bounce distance
        paddingTop: PARALLAX_HEADER_MAX_HEIGHT + 16,
      }}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                y: scrollY,
              },
            },
          },
        ],
        { useNativeDriver: true }
      )}
      onScrollEndDrag={keepScrollViewsInSync}
      onMomentumScrollEnd={keepScrollViewsInSync}
    >
      <Box gap="s" paddingHorizontal="m">
        <Text variant="title" color="onSurface">
          Author
        </Text>
        <Link
          href={{
            pathname: `/profiles/${mockedRoutine.author.id}`,
            params: { name: mockedRoutine.author.name },
          }}
          asChild
        >
          <Pressable>
            {({ pressed }) => (
              <Box flexDirection="row" gap="s" opacity={pressed ? 0.5 : 1}>
                <Avatar
                  size="m"
                  source={{ uri: "https://unavatar.io/github/Wenceslauu" }}
                />
                <Text variant="body" color="onSurface">
                  {mockedRoutine.author.name}
                </Text>
              </Box>
            )}
          </Pressable>
        </Link>
      </Box>
      {/* paddingHorizontal is not here so as not to mess up the gradient */}
      <Box gap="s">
        <Text variant="title" color="onSurface" paddingHorizontal="m">
          Description
        </Text>
        <TruncatedText text={mockedRoutine.description} />
      </Box>
      <Box gap="s">
        <Link href={`/routines/${id}/reviews`} asChild>
          <Pressable>
            {({ pressed }) => (
              <Box opacity={pressed ? 0.5 : 1}>
                <Box
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  opacity={pressed ? 0.5 : 1}
                >
                  <Text variant="title" color="onSurface" paddingLeft="m">
                    Reviews
                  </Text>
                  <Box
                    flexDirection="row"
                    alignItems="center"
                    gap="xs"
                    paddingRight="m"
                  >
                    <Ionicons name="star" size={16} color={colors.onSurface} />
                    <Text variant="body" color="onSurface">
                      {mockedRoutine.rating} ({mockedRoutine.numberOfReviews})
                    </Text>
                    <Ionicons
                      name="chevron-forward"
                      size={27}
                      color={colors.onSurfaceContainer}
                    />
                  </Box>
                </Box>
                <Box flexDirection="row" gap="m">
                  <FlashList
                    horizontal={true}
                    data={mockedRoutine.reviews}
                    estimatedItemSize={300}
                    renderItem={({ item }) => (
                      <RoutineReviewCard review={item} preview />
                    )}
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                    ItemSeparatorComponent={() => <Box width={20} />}
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                  />
                </Box>
              </Box>
            )}
          </Pressable>
        </Link>
      </Box>
      <Box gap="s" paddingHorizontal="m">
        <Text variant="title" color="onSurface">
          Properties
        </Text>
        <Table
          rows={[
            { label: "Category", value: mockedRoutine.category },
            { label: "Frequency", value: mockedRoutine.daysPerWeek },
            { label: "Equipment", value: mockedRoutine.equipment },
            { label: "Difficulty", value: mockedRoutine.difficulty },
          ]}
        />
      </Box>
    </Animated.ScrollView>
  );
}
