import CustomTabNavigator from "@/components/CustomTabNavigator";

import NotificationsTab from "./notifications";
import RequestsTab from "./requests";
import { useUnseenActivity } from "@/providers/unseenActivity";

export default function ActivityLayout() {
  const { hasUnseenNotifications, hasUnseenRequests } = useUnseenActivity();

  return (
    <CustomTabNavigator
      tabs={[
        { name: "notifications", component: NotificationsTab },
        { name: "requests", component: RequestsTab },
      ]}
      initialRouteName="notifications"
      unseenStatuses={[
        {
          name: "notifications",
          hasUnseenItems: hasUnseenNotifications,
        },
        {
          name: "requests",
          hasUnseenItems: hasUnseenRequests,
        },
      ]}
    />
  );
}
