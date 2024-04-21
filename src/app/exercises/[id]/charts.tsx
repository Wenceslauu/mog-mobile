import Box from "@/components/Box";
import Table from "@/components/Table";
import Text from "@/components/Text";
import { ScrollView } from "react-native";

const mockedAchievements = {
  "1RM": "100kg",
  setVolume: "900kg",
};

export default function ExerciseDetailsChartsTab() {
  return (
    <Box flex={1} gap="xs" backgroundColor="surface">
      <ScrollView
        contentContainerStyle={{ gap: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Box gap="s" paddingHorizontal="m">
          <Text variant="title" color="onSurface">
            Achievements
          </Text>
          <Table
            rows={[
              { label: "1RM", value: mockedAchievements["1RM"] },
              { label: "Set Volume", value: mockedAchievements.setVolume },
            ]}
          />
        </Box>
      </ScrollView>
    </Box>
  );
}
