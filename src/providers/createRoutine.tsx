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
        name: "Cycle 1",
        duration: 0,
        workouts: [],
      },
      {
        name: "Cycle 2",
        duration: 0,
        workouts: [],
      },
    ],
  });

  return (
    <CreateRoutineContext.Provider value={{ routine, setRoutine }}>
      {children}
    </CreateRoutineContext.Provider>
  );
}
