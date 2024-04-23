import { RoutineDraft } from "@/types/Routine";
import {
  MutableRefObject,
  ReactNode,
  createContext,
  useContext,
  useRef,
} from "react";
import { DraftFunction, useImmer } from "use-immer";

export type CreateRoutineContextData = {
  routine: RoutineDraft;
  setRoutine: (
    immerRoutine: RoutineDraft | DraftFunction<RoutineDraft>
  ) => void;
  resetRoutine: () => void;

  isDirty: MutableRefObject<boolean>;
};

export const CreateRoutineContext = createContext<CreateRoutineContextData>(
  {} as CreateRoutineContextData
);

type CreateRoutineProviderProps = {
  children: ReactNode;
};

const mockedCreationRoutine = {
  name: "",
  description: "",
  categories: [],
  cycles: [
    {
      name: "New Cycle",
      workouts: [
        {
          name: "New Workout",
          exercises: [
            {
              id: 1,
              name: "Bench Press",
              image: "https://source.unsplash.com/random",
              authorNotes: "Bend the bar!",
              restDuration: 90,
              sets: [
                {
                  reps: undefined,
                  intensity: undefined,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default function CreateRoutineProvider({
  children,
}: CreateRoutineProviderProps) {
  const [routine, setRoutine] = useImmer(mockedCreationRoutine);

  const isDirty = useRef(false);

  const resetRoutine = () => {
    setRoutine(mockedCreationRoutine);
  };

  return (
    <CreateRoutineContext.Provider
      value={{ routine, setRoutine, resetRoutine, isDirty }}
    >
      {children}
    </CreateRoutineContext.Provider>
  );
}

export function useCreateRoutine() {
  return useContext(CreateRoutineContext);
}
