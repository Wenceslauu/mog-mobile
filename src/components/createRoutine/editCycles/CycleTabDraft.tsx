import { ScrollView } from "react-native";
import WorkoutCardDraft from "./WorkoutCardDraft";
import Button from "../../Button";

type CycleTabProps = {
  workoutDrafts: {
    name: string;
  }[];
  cycleIndex: number;
  handleAddWorkout: () => void;
  handleDeleteWorkout: (cycleIndex: number, workoutIndex: number) => void;
  handleRenameWorkout: (
    name: string,
    cycleIndex: number,
    workoutIndex: number
  ) => void;
};

export default function CycleTabDraft({
  workoutDrafts,
  cycleIndex,
  handleAddWorkout,
  handleDeleteWorkout,
  handleRenameWorkout,
}: CycleTabProps) {
  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        paddingBottom: 40,
        paddingHorizontal: 16,
      }}
      showsVerticalScrollIndicator={false}
    >
      {workoutDrafts.map((workoutDraft, index) => {
        return (
          <WorkoutCardDraft
            key={index}
            name={workoutDraft.name}
            cycleIndex={cycleIndex}
            workoutIndex={index}
            handleDeleteWorkout={handleDeleteWorkout}
            handleRenameWorkout={handleRenameWorkout}
          />
        );
      })}
      <Button variant="secondary" onPress={handleAddWorkout}>
        Add workout
      </Button>
    </ScrollView>
  );
}
