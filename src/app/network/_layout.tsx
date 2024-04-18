import CustomTabNavigator from "@/components/CustomTabNavigator";

import FollowingTab from "./following";
import FollowersTab from "./followers";

export default function ActivityLayout() {
  return (
    <CustomTabNavigator
      tabs={[
        { name: "followers", component: FollowersTab },
        { name: "following", component: FollowingTab },
      ]}
      initialRouteName="followers"
    />
  );
}
