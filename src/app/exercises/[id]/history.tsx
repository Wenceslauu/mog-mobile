import Box from "@/components/Box";
import ExerciseLogCard from "@/components/exercises/ExerciseLogCard";
import { FlashList } from "@shopify/flash-list";

const mockedLogs = [
  {
    workout: "Upper 1",
    date: new Date(2024, 1, 12),
    sets: [
      { reps: 10, weight: 60 },
      { reps: 10, weight: 60 },
      { reps: 8, weight: 60 },
    ],
  },
  {
    workout: "Upper 1",
    date: new Date(2024, 1, 5),
    sets: [
      { reps: 8, weight: 60 },
      { reps: 8, weight: 60 },
      { reps: 8, weight: 60 },
    ],
  },
];

export default function ExerciseDetailsHistoryTab() {
  return (
    <Box flex={1} gap="xs" backgroundColor="surface">
      <FlashList
        keyboardDismissMode="on-drag"
        data={mockedLogs}
        estimatedItemSize={100}
        renderItem={({ item }) => <ExerciseLogCard exerciseLog={item} />}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        ItemSeparatorComponent={() => <Box height={20} />}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
}
