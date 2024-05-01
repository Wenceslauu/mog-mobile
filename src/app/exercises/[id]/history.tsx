import Box from "@/components/Box";
import ExerciseLogCard from "@/components/exerciseDetails/ExerciseLogCard";
import { createRandomExerciseLogIsolated } from "@/helpers/mocks/Log";
import { FlashList } from "@shopify/flash-list";

const mockedLogs = Array.from({ length: 5 }, createRandomExerciseLogIsolated);

export default function ExerciseDetailsHistoryTab() {
  return (
    <Box flex={1} gap="xs" backgroundColor="surface">
      <FlashList
        keyboardDismissMode="on-drag"
        data={mockedLogs}
        estimatedItemSize={100}
        renderItem={({ item }) => <ExerciseLogCard exerciseLog={item} />}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
        ItemSeparatorComponent={() => <Box height={20} />}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
}
