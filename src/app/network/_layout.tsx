import CustomTabNavigator from "@/components/CustomTabNavigator";

import FollowingTab from "./following";
import FollowersTab from "./followers";
import Box from "@/components/Box";
import LocalSearchBar from "@/components/LocalSearchBar";
import { useState } from "react";

export default function ActivityLayout() {
  const [searchText, setSearchText] = useState("");

  return (
    <Box flex={1}>
      <Box
        padding="m"
        style={{
          paddingBottom: 0,
        }}
      >
        <LocalSearchBar
          text={searchText}
          setText={setSearchText}
          placeholder="Search users"
        />
      </Box>
      <CustomTabNavigator
        tabs={[
          { name: "followers", component: FollowersTab },
          { name: "following", component: FollowingTab },
        ]}
        initialRouteName="followers"
      />
    </Box>
  );
}
