import { ScrollView } from "react-native";
import WorkoutCardDraft from "./WorkoutCardDraft";
import Button from "../Button";

type CycleTabProps = {
  workoutDrafts: {
    name: string;
    workoutId: string;
  }[];
  handleAddWorkout: () => void;
};

export default function CycleTabDraft({
  workoutDrafts,
  handleAddWorkout,
}: CycleTabProps) {
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
      <Button variant="secondary" onPress={handleAddWorkout}>
        Add workout
      </Button>
    </ScrollView>
  );
}
