import Box from "@/components/Box";
import NotificationCard from "@/components/activity/NotificationCard";
import { createRandomNotification } from "@/helpers/mocks/Activity";
import { Notification } from "@/types/Activity";
import { FlashList } from "@shopify/flash-list";

const mockedNotifications: Notification[] = Array.from(
  { length: 5 },
  createRandomNotification
);

export default function NotificationsTab() {
  return (
    <Box flex={1} gap="xs" backgroundColor="surface">
      <FlashList
        data={mockedNotifications}
        // All notification types are 86 pixels tall except for the comment one which is about 120
        // For most people, comments won't be the most common notification type, so we can estimate the item size down to 92
        estimatedItemSize={92}
        renderItem={({ item }) => <NotificationCard notification={item} />}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
        ItemSeparatorComponent={() => <Box height={8} />}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
}
