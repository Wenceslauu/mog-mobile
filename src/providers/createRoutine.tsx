import { CreateRoutineContext } from "@/contexts/createRoutine";
import { ReactNode, useState } from "react";
import { useImmer } from "use-immer";

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
                sets: [
                  {
                    reps: 10,
                    intensity: "RPE 7",
                  },
                  {
                    reps: 10,
                    intensity: "RPE 8",
                  },
                  {
                    reps: 10,
                    intensity: "RPE 9",
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
                  sets: [
                    {
                      reps: 10,
                      intensity: "RPE 7",
                    },
                    {
                      reps: 10,
                      intensity: "RPE 8",
                    },
                    {
                      reps: 10,
                      intensity: "RPE 9",
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
