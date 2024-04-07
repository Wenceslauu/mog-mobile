import Box from "@/components/Box";
import NotificationCard from "@/components/activity/NotificationCard";
import { Notification, NotificationType } from "@/types/Activity";
import { FlashList } from "@shopify/flash-list";

const mockedNotifications: Notification[] = [
  {
    id: 1,
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
    isSeen: false,
  },
  {
    id: 2,
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
    comment: {
      id: 100,
      text: "Parabéns, Thigas!",
    },
    timestamp: new Date(2024, 0, 30, 11),
    isRead: false,
    isSeen: false,
  },
  {
    id: 3,
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
    isSeen: false,
  },
  {
    id: 4,
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
    review: {
      id: 4,
      rating: 5,
      text: "Não estou mais passando pelas portas",
    },
    timestamp: new Date(2024, 0, 30, 12),
    isRead: true,
    isSeen: false,
  },
  {
    id: 5,
    triggerUser: {
      id: 1,
      name: "Pedro",
      // image: ""
    },
    type: NotificationType.Follow,
    timestamp: new Date(2024, 0, 30, 12),
    isRead: true,
    isSeen: false,
  },
];

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
          paddingBottom: 30,
        }}
        ItemSeparatorComponent={() => <Box height={8} />}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
}
