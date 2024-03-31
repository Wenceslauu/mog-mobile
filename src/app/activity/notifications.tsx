import Box from "@/components/Box";
import NotificationCard from "@/components/activity/NotificationCard";
import { Notification, NotificationType } from "@/types/Notification";
import { FlashList } from "@shopify/flash-list";

const mockedNotifications: Notification[] = [
  {
    triggerUser: {
      id: 2,
      name: "Henry",
      // image: ""
    },
    type: NotificationType.Like,
    post: {
      id: 2,
      text: "Com direito a PR no supino inclinado",
    },
    timestamp: new Date(2024, 0, 30, 11),
    isRead: false,
  },
  {
    triggerUser: {
      id: 2,
      name: "Henry",
      // image: ""
    },
    type: NotificationType.Comment,
    post: {
      id: 1,
      text: "Com direito a PR no supino inclinado",
    },
    comment: "Parabéns, Thigas!",
    timestamp: new Date(2024, 0, 30, 11),
    isRead: false,
  },
  {
    triggerUser: {
      id: 2,
      name: "Lui",
      // image: ""
    },
    type: NotificationType.Athlete,
    routine: {
      id: 2,
      name: "Panturrilha de aço",
    },
    timestamp: new Date(2024, 0, 30, 11),
    isRead: true,
  },
  {
    triggerUser: {
      id: 1,
      name: "Thigas",
      // image: ""
    },
    type: NotificationType.Review,
    routine: {
      id: 1,
      name: "Braço de 50cm",
    },
    timestamp: new Date(2024, 0, 30, 12),
    isRead: true,
  },
  {
    triggerUser: {
      id: 1,
      name: "Pedro",
      // image: ""
    },
    type: NotificationType.Follow,
    timestamp: new Date(2024, 0, 30, 12),
    isRead: true,
  },
];

export default function NotificationsTab() {
  return (
    <Box flex={1} gap="xs" backgroundColor="surface">
      <FlashList
        data={mockedNotifications}
        estimatedItemSize={100}
        renderItem={({ item }) => <NotificationCard notification={item} />}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        ItemSeparatorComponent={() => <Box height={8} />}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
}
