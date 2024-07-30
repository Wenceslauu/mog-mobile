import { createRandomWorkoutLogDraft } from "@/helpers/mocks/Log";
import { WorkoutLogDraft } from "@/types/Log";
import { createContext, ReactNode, useContext } from "react";
import { DraftFunction, useImmer } from "use-immer";

export type OngoingLogContextData = {
  workoutLog: WorkoutLogDraft;
  setWorkoutLog: (
    immerWorkoutLog: WorkoutLogDraft | DraftFunction<WorkoutLogDraft>
  ) => void;
  resetWorkoutLog: () => void;
};

export const OngoingLogContext = createContext<OngoingLogContextData>(
  {} as OngoingLogContextData
);

type OngoingLogProviderProps = {
  children: ReactNode;
};

const mockedCreationWorkoutLog = createRandomWorkoutLogDraft("creation");

export default function OngoingLogProvider({
  children,
}: OngoingLogProviderProps) {
  const [workoutLog, setWorkoutLog] = useImmer(mockedCreationWorkoutLog);

  const resetWorkoutLog = () => {
    setWorkoutLog(mockedCreationWorkoutLog);
  };

  return (
    <OngoingLogContext.Provider
      value={{
        workoutLog,
        setWorkoutLog,
        resetWorkoutLog,
      }}
    >
      {children}
    </OngoingLogContext.Provider>
  );
}

export function useOngoingLog() {
  return useContext(OngoingLogContext);
}
