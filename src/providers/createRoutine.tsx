import { RoutineDraft } from "@/types/Routine";
import { ReactNode, createContext, useContext, useState } from "react";
import { DraftFunction, useImmer } from "use-immer";

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

type CreateRoutineProviderProps = {
  children: ReactNode;
};

export default function CreateRoutineProvider({
  children,
}: CreateRoutineProviderProps) {
  const [routine, setRoutine] = useImmer({
    name: "",
    description: "",
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
  });

  const [isDirty, setIsDirty] = useState(false);

  const resetRoutine = () => {
    setRoutine({
      name: "",
      description: "",
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
    });
  };

  return (
    <CreateRoutineContext.Provider
      value={{ routine, setRoutine, resetRoutine, isDirty, setIsDirty }}
    >
      {children}
    </CreateRoutineContext.Provider>
  );
}

export function useCreateRoutine() {
  return useContext(CreateRoutineContext);
}
