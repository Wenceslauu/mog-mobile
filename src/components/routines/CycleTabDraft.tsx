import { ScrollView } from "react-native";
import WorkoutCardDraft from "./WorkoutCardDraft";

type CycleTabProps = {
  workoutDrafts: {
    name: string;
    workoutId: number;
  }[];
};

export default function CycleTabDraft({ workoutDrafts }: CycleTabProps) {
  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        paddingBottom: 30,
        paddingHorizontal: 16,
      }}
      showsVerticalScrollIndicator={false}
    >
      {workoutDrafts.map((workoutDraft, index) => {
        return (
          <WorkoutCardDraft
            key={index}
            name={workoutDraft.name}
            workoutId={workoutDraft.workoutId}
          />
        );
      })}
    </ScrollView>
  );
}
