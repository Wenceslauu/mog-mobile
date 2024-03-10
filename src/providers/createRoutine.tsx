import { CreateRoutineContext } from "@/contexts/createRoutine";
import { ReactNode, useState } from "react";
import { randomUUID } from "expo-crypto";

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
            workoutId: randomUUID(),
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
              workoutId: randomUUID(),
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
