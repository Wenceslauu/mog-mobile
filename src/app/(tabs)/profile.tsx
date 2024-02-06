import { Pressable } from "react-native";
import { useEffect } from "react";
import { Link, useNavigation } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Box from "@/components/Box";
import Text from "@/components/Text";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/constants/theme";
import Avatar from "@/components/Avatar";
import { FlashList } from "@shopify/flash-list";
import RoutineCard from "@/components/routines/RoutineCard";
import PostCard from "@/components/home/PostCard";

const mockedUser = {
  picture: "https://unavatar.io/github/Wenceslauu",
  name: "João Vitor Wenceslau",
  username: "wences",
  workouts: 64,
  followers: 129,
  following: 31,
  routines: [
    {
      id: 1,
      thumbnail: require("../../../assets/images/bench-press.jpg"),
      name: "Braço de 50 cm",
      author: "wences",
      rating: 4.5,
      category: "Hypertrophy",
      difficulty: "Intermediate",
      daysPerWeek: "4 days/week",
      duration: "8 weeks",
      equipment: "Full gym",
      numberOfAthletes: 10,
    },
    {
      id: 3,
      // thumbnail: require("../../../assets/images/squat.jpg"),
      name: "Panturrilha colossal",
      author: "wences",
      rating: 5,
      category: "Hypertrophy",
      difficulty: "Intermediate",
      daysPerWeek: "6 days/week",
      duration: "20 weeks",
      equipment: "At home",
      numberOfAthletes: 1,
    },
  ],
  posts: [
    {
      author: {
        name: "wences",
        picture: "https://unavatar.io/github/Wenceslauu",
      },
      text: "brinca muito",
      duration: "5h",
      volume: "10000",
      sets: 50,
      achievements: 12,
      likes: 38,
      timestamp: new Date(2024, 0, 20, 9, 30),
      isLiked: true,
      images: [],
      exercises: [
        {
          name: "Dumbbell Bench Press",
          sets: 5,
        },
        {
          name: "Crossover",
          sets: 3,
        },
        {
          name: "Pushups",
          sets: 3,
        },
        {
          name: "Dips",
          sets: 3,
        },
        {
          name: "Chest Press Machine",
          sets: 3,
        },
      ],
      comments: [
        {
          author: {
            name: "lui",
            picture: "https://unavatar.io/github/pedroandrade03",
          },
          text: "ta maluco",
          timestamp: new Date(2024, 0, 23, 20),
        },
      ],
    },
    {
      author: {
        name: "wences",
        picture: "https://unavatar.io/github/Wenceslauu",
      },
      text: "adoro fazer supino",
      duration: "3h",
      volume: "3200kg",
      sets: 30,
      achievements: 2,
      likes: 20,
      timestamp: new Date(2024, 0, 10, 16, 30),
      isLiked: false,
      images: [require("../../../assets/images/bench-press.jpg")],
      exercises: [
        {
          name: "Dumbbell Bench Press",
          sets: 5,
        },
        {
          name: "Crossover",
          sets: 3,
        },
        {
          name: "Pushups",
          sets: 3,
        },
        {
          name: "Dips",
          sets: 3,
        },
        {
          name: "Chest Press Machine",
          sets: 3,
        },
      ],
      comments: [
        {
          author: {
            name: "lui",
            picture: "https://unavatar.io/github/pedroandrade03",
          },
          text: "tu ta treinando certo",
          timestamp: new Date(2024, 0, 10, 20),
        },
      ],
    },
  ],
};

export default function ProfileTab() {
  const { colors } = useTheme<Theme>();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Link href="/settings" asChild>
          <Pressable>
            {({ pressed }) => (
              <Ionicons
                name="settings-outline"
                size={25}
                color={colors.onSurfaceContainer}
                style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </Link>
      ),
      headerRight: () => (
        <Box flexDirection="row">
          <Link href="/edit-profile" asChild>
            <Pressable>
              {({ pressed }) => (
                <MaterialCommunityIcons
                  name="account-edit-outline"
                  size={29}
                  color={colors.onSurfaceContainer}
                  style={{ marginRight: 11, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
          <Link href="/share-profile" asChild>
            <Pressable>
              {({ pressed }) => (
                <Ionicons
                  name="share-social"
                  size={25}
                  color={colors.onSurfaceContainer}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        </Box>
      ),
    });
  }, [navigation]);

  return (
    <Box flex={1} gap="m" paddingTop="m" backgroundColor="surface">
      <FlashList
        keyboardDismissMode="on-drag"
        data={mockedUser.posts}
        estimatedItemSize={100}
        ListHeaderComponent={() => (
          <Box gap="m">
            <Box
              flexDirection="row"
              gap="l"
              paddingHorizontal="m"
              alignItems="center"
            >
              <Avatar size="l" source={mockedUser.picture} />
              <Box gap="s">
                <Text variant="headline" color="onSurface">
                  {mockedUser.name}
                </Text>
                <Box flexDirection="row" justifyContent="space-around">
                  <Box alignItems="center">
                    <Text variant="label" color="onSurface">
                      treinos
                    </Text>
                    <Text variant="body" color="onSurface">
                      {mockedUser.workouts}
                    </Text>
                  </Box>
                  <Box alignItems="center">
                    <Text variant="label" color="onSurface">
                      seguidores
                    </Text>
                    <Text variant="body" color="onSurface">
                      {mockedUser.followers}
                    </Text>
                  </Box>
                  <Box alignItems="center">
                    <Text variant="label" color="onSurface">
                      treinos
                    </Text>
                    <Text variant="body" color="onSurface">
                      {mockedUser.following}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box gap="s">
              <Text variant="title" color="onSurface" paddingHorizontal="m">
                Rotinas
              </Text>
              <FlashList
                horizontal={true}
                keyboardDismissMode="on-drag"
                data={mockedUser.routines}
                estimatedItemSize={300}
                renderItem={({ item }) => (
                  <RoutineCard routine={item} isListedHorizontally />
                )}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                ItemSeparatorComponent={() => <Box width={20} />}
                showsHorizontalScrollIndicator={false}
              />
            </Box>
            <Text variant="title" color="onSurface" paddingHorizontal="m">
              Posts
            </Text>
          </Box>
        )}
        ListHeaderComponentStyle={{ paddingBottom: 8 }}
        renderItem={({ item }) => <PostCard post={item} />}
        contentContainerStyle={{ paddingBottom: 30 }}
        ItemSeparatorComponent={() => <Box height={20} />}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
}
