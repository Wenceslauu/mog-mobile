import Box from "@/components/Box";
import RequestCard from "@/components/activity/RequestCard";
import { Request, RequestStatus } from "@/types/Activity";
import { FlashList } from "@shopify/flash-list";

const mockedRequests: Request[] = [
  {
    id: 1,
    requestorUser: {
      id: 1,
      name: "Henry",
      // image: ""
    },
    timestamp: new Date(2024, 0, 30, 11),
    status: RequestStatus.Pending,
    isRead: false,
    isSeen: true,
  },
  {
    id: 2,
    requestorUser: {
      id: 2,
      name: "Caique",
      // image: ""
    },
    timestamp: new Date(2024, 0, 20, 11),
    status: RequestStatus.Pending,
    isRead: false,
    isSeen: true,
  },
  {
    id: 3,
    requestorUser: {
      id: 3,
      name: "Yan",
      // image: ""
    },
    timestamp: new Date(2024, 0, 20, 11),
    status: RequestStatus.Pending,
    isRead: true,
    isSeen: true,
  },
];

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
