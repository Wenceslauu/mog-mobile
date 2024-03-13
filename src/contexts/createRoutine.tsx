import { RoutineDraft } from "@/types/Routine";
import { createContext } from "react";
import { DraftFunction } from "use-immer";

export type CreateRoutineContextData = {
  routine: RoutineDraft;
  setRoutine: (
    immerRoutine: RoutineDraft | DraftFunction<RoutineDraft>
  ) => void;
  resetRoutine: () => void;

  isDirty: boolean;
  setIsDirty: (isDirty: boolean) => void;
};

export const CreateRoutineContext = createContext<CreateRoutineContextData>(
  {} as CreateRoutineContextData
);
