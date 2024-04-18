import Box from "@/components/Box";
import UserCard from "@/components/network/UserCard";
import { FlashList } from "@shopify/flash-list";

const mockedFollowing = [
  {
    id: 2,
    name: "Lui",
    picture: "https://unavatar.io/github/pedroandrade03",
    isFollowed: true,
  },
  {
    id: 3,
    name: "Pedro",
    picture: "https://unavatar.io/github/pedroandrade03",
    isFollowed: true,
  },
  {
    id: 4,
    name: "Henry",
    picture: "https://unavatar.io/github/pedroandrade03",
    isFollowed: true,
  },
];

export default function FollowingTab() {
  return (
    <Box flex={1} gap="xs" backgroundColor="surface">
      <FlashList
        data={mockedFollowing}
        estimatedItemSize={92}
        renderItem={({ item }) => <UserCard user={item} />}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        ItemSeparatorComponent={() => <Box height={8} />}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
}
