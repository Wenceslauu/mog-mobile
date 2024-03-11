import { createContext } from "react";

export type CreateRoutineContextData = {
  routine: {
    name: string;
    description?: string;
    cycles: {
      name: string;
      duration?: number;
      workouts: {
        workoutId: string;
        name: string;
        exercises: {
          name: string;
          reps: number;
          intensity: string;
        }[];
      }[];
    }[];
  };
  setRoutine: (routine: any) => void;
  resetRoutine: () => void;

  isDirty: boolean;
  setIsDirty: (isDirty: boolean) => void;
};

export const CreateRoutineContext = createContext<CreateRoutineContextData>(
  {} as CreateRoutineContextData
);
