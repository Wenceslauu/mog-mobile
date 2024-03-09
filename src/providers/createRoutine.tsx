import { CreateRoutineContext } from "@/contexts/createRoutine";
import { ReactNode, useState } from "react";

type CreateRoutineProviderProps = {
  children: ReactNode;
};

export default function CreateRoutineProvider({
  children,
}: CreateRoutineProviderProps) {
  const [routine, setRoutine] = useState({
    name: "",
    description: "",
    cycles: [
      {
        name: "New Cycle",
        workouts: [
          {
            name: "New Workout",
            workoutId: Math.random(),
            exercises: [],
          },
        ],
      },
    ],
  });

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
              workoutId: Math.random(),
              exercises: [],
            },
          ],
        },
      ],
    });
  };

  return (
    <CreateRoutineContext.Provider
      value={{ routine, setRoutine, resetRoutine }}
    >
      {children}
    </CreateRoutineContext.Provider>
  );
}
