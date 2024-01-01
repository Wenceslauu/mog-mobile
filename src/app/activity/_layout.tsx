import CustomTabNavigator from "@/components/CustomTabNavigator";

export default function HomeLayout() {
  return (
    <CustomTabNavigator
      tabs={[
        { name: "notifications", href: "/activity/notifications" },
        { name: "requests", href: "/activity/requests" },
      ]}
      initialRouteName="notifications"
    />
  );
}
