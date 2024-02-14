import CustomTabNavigator from "@/components/CustomTabNavigator";

import NotificationsTab from "./notifications";
import RequestsTab from "./requests";

export default function ActivityLayout() {
  return (
    <CustomTabNavigator
      tabs={[
        { name: "notifications", component: NotificationsTab },
        { name: "requests", component: RequestsTab },
      ]}
      initialRouteName="notifications"
    />
  );
}
