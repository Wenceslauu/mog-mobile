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
import { Link, useGlobalSearchParams } from "expo-router";
import { useContext } from "react";
import { ScrollingContext } from "@/contexts/scrolling";
import TABVIEW_HEADER_HEIGHT from "@/constants/tabViewHeaderHeight";
import PARALLAX_HEADER_MAX_HEIGHT from "@/constants/parallaxHeaderMaxHeight";

import {
  RoutineCategoryEnum,
  RoutineDifficultyEnum,
  RoutineEquipmentEnum,
} from "@/types/Routine";
import { RoutineDetailsContext } from "./_layout";

export default function RoutineDetailsAboutTab() {
  const { id } = useGlobalSearchParams();

  const { scrollY, scrollViewRefs } = useContext(ScrollingContext);

  const { routine } = useContext(RoutineDetailsContext);

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
            pathname: `/profiles/${routine.author.id}`,
            params: { name: routine.author.name },
          }}
          asChild
        >
          <Pressable>
            {({ pressed }) => (
              <Box flexDirection="row" gap="s" opacity={pressed ? 0.5 : 1}>
                <Avatar size="m" source={routine.author.picture} />
                <Text variant="body" color="onSurface">
                  {routine.author.name}
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
        <TruncatedText text={routine.description} />
      </Box>
      <Box gap="s">
        <Link href={`/routines/${id}/reviews`} asChild>
          <Pressable>
            {({ pressed }) => (
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
                    {routine.rating} ({routine.numberOfReviews})
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={27}
                    color={colors.onSurfaceContainer}
                  />
                </Box>
              </Box>
            )}
          </Pressable>
        </Link>
        <Box flexDirection="row" gap="m">
          <FlashList
            horizontal={true}
            data={routine.reviewsSample}
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
      <Box gap="s" paddingHorizontal="m">
        <Text variant="title" color="onSurface">
          Properties
        </Text>
        <Table
          rows={[
            {
              label: "Category",
              value: RoutineCategoryEnum[routine.category],
            },
            {
              label: "Equipment",
              value: RoutineEquipmentEnum[routine.equipment],
            },
            {
              label: "Difficulty",
              value: RoutineDifficultyEnum[routine.difficulty[0]],
            },
            {
              label: "Frequency",
              value: `${routine.minFrequency} - ${routine.maxFrequency} days a week`,
            },
            {
              label: "Duration",
              value: `${routine.duration} weeks`,
            },
          ]}
        />
      </Box>
    </Animated.ScrollView>
  );
}
