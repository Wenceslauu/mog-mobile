import { WorkoutPreview } from "@/types/Routine";
import { ScrollView } from "react-native";
import WorkoutCard from "./WorkoutCard";

type CycleTabProps = {
  workouts: WorkoutPreview[];
};

export default function CycleTab({ workouts }: CycleTabProps) {
  return (
    <ScrollView
      nestedScrollEnabled
      contentContainerStyle={{
        gap: 16,
        paddingBottom: 240,
        paddingHorizontal: 16,
      }}
      showsVerticalScrollIndicator={false}
    >
      {workouts.map((workout: any, index: number) => {
        return (
          <WorkoutCard
            key={index}
            workout={workout}
            isFirst={index === 0 ? true : undefined}
          />
        );
      })}
    </ScrollView>
  );
}
