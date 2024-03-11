import { createContext } from "react";

export type CreateRoutineContextData = {
  routine: {
    name: string;
    description?: string;
    cycles: {
      name: string;
      duration?: number;
      workouts: {
        name: string;
        exercises: {
          id: number;
          name: string;
          image?: string;
          sets: {
            reps: number;
            intensity: string;
          }[];
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
