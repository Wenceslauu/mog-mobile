import Box from "@/components/Box";
import PostCard from "@/components/home/PostCard";
import { useScrollToTop } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { useRef } from "react";

const mockedPosts = [
  {
    author: {
      name: "lui",
      picture: "https://unavatar.io/github/pedroandrade03",
    },
    text: "fazer supino é mt chato affff",
    duration: "1h",
    volume: "2500kg",
    sets: 20,
    achievements: 2,
    likes: 10,
    timestamp: new Date(2024, 0, 17, 9, 30),
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
          name: "wences",
          picture: "https://unavatar.io/github/Wenceslauu",
        },
        text: "tu ta treinando errado",
        timestamp: new Date(2024, 0, 17, 20),
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
    images: [
      require("../../../../assets/images/bench-press.jpg"),
      require("../../../../assets/images/squat.jpg"),
    ],
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
];

export default function FollowingTab() {
  const postsListRef = useRef(null);

  // Scroll to top when the active tab is tapped
  useScrollToTop(postsListRef);

  return (
    <Box flex={1} gap="xs" paddingTop="m" backgroundColor="surface">
      <FlashList
        ref={postsListRef}
        keyboardDismissMode="on-drag"
        data={mockedPosts}
        estimatedItemSize={100}
        renderItem={({ item }) => <PostCard post={item} />}
        contentContainerStyle={{ paddingBottom: 30 }}
        ItemSeparatorComponent={() => <Box height={20} />}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
}
