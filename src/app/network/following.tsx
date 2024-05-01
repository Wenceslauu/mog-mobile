import Box from "@/components/Box";
import UserCard from "@/components/network/UserCard";
import { createRandomProfilePreview } from "@/helpers/mocks/User";
import { FlashList } from "@shopify/flash-list";

const mockedFollowing = Array.from(
  {
    length: 10,
  },
  createRandomProfilePreview
);

export default function FollowingTab() {
  return (
    <Box flex={1} gap="xs" backgroundColor="surface">
      <FlashList
        data={mockedFollowing}
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
