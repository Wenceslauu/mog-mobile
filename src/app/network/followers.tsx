import Box from "@/components/Box";
import UserCard from "@/components/network/UserCard";
import { FlashList } from "@shopify/flash-list";

const mockedFollowers = [
  {
    id: 2,
    name: "Thigas",
    picture: "https://unavatar.io/github/pedroandrade03",
    isFollowed: true,
  },
  {
    id: 3,
    name: "Cambras",
    picture: "https://unavatar.io/github/pedroandrade03",
    isFollowed: false,
  },
  {
    id: 4,
    name: "Lucão",
    picture: "https://unavatar.io/github/pedroandrade03",
    isFollowed: false,
  },
];

export default function FollowersTab() {
  return (
    <Box flex={1} gap="xs" backgroundColor="surface">
      <FlashList
        data={mockedFollowers}
        estimatedItemSize={92}
        renderItem={({ item }) => <UserCard user={item} />}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
        ItemSeparatorComponent={() => <Box height={8} />}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
}
