import { Animated } from "react-native";
import WorkoutCardDraft from "./WorkoutCardDraft";
import Button from "../../Button";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import Box from "@/components/Box";
import { useRef } from "react";
import { WorkoutDraft } from "@/types/Routine";

type CycleTabProps = {
  workoutDrafts: WorkoutDraft[];
  cycleIndex: number;
  handleAddWorkout: () => void;
  handleDeleteWorkout: (cycleIndex: number, workoutIndex: number) => void;
  handleRenameWorkout: (
    name: string,
    cycleIndex: number,
    workoutIndex: number
  ) => void;
  handleReorderWorkouts: (
    newWorkoutDrafts: WorkoutDraft[],
    cycleIndex: number
  ) => void;
};

export default function CycleTabDraft({
  workoutDrafts,
  cycleIndex,
  handleAddWorkout,
  handleDeleteWorkout,
  handleRenameWorkout,
  handleReorderWorkouts,
}: CycleTabProps) {
  const draggableScale = useRef(new Animated.Value(1)).current;
  const highlightDraggableItem = () => {
    Animated.timing(draggableScale, {
      toValue: 1.03,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const stopDragging = () => {
    Animated.timing(draggableScale, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <DraggableFlatList
      data={workoutDrafts}
      keyExtractor={(item) => item.id}
      renderItem={({ item, getIndex, drag, isActive }) => (
        <>
          <ScaleDecorator activeScale={1.03}>
            <WorkoutCardDraft
              name={item.name}
              cycleIndex={cycleIndex}
              workoutIndex={getIndex() as number}
              handleDeleteWorkout={handleDeleteWorkout}
              handleRenameWorkout={handleRenameWorkout}
              drag={drag}
              isActive={isActive}
              draggableScale={draggableScale}
              highlightDraggableItem={highlightDraggableItem}
            />
          </ScaleDecorator>
          <Box height={16} />
        </>
      )}
      onDragEnd={({ data }) => {
        handleReorderWorkouts(data, cycleIndex);
      }}
      onRelease={stopDragging}
      contentContainerStyle={{
        paddingBottom: 32,
        paddingHorizontal: 16,
      }}
      ListFooterComponent={() => (
        <Button variant="secondary" onPress={handleAddWorkout}>
          Add workout
        </Button>
      )}
    />
  );
}
