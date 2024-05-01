import Box from "@/components/Box";
import RequestCard from "@/components/activity/RequestCard";
import { FollowRequest } from "@/types/Activity";
import { FlashList } from "@shopify/flash-list";
import { createRandomFollowRequest } from "@/helpers/mocks/Activity";

const mockedRequests: FollowRequest[] = Array.from(
  { length: 5 },
  createRandomFollowRequest
);

export default function RequestsTab() {
  return (
    <Box flex={1} gap="xs" backgroundColor="surface">
      <FlashList
        data={mockedRequests}
        estimatedItemSize={86}
        renderItem={({ item }) => <RequestCard request={item} />}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
        ItemSeparatorComponent={() => <Box height={8} />}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
}
