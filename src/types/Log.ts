import { Workout, WorkoutExercise, WorkoutSet } from "@/types/Routine";
import { EnduranceCriteriaEnum, Exercise } from "./Exercise";
import { UserSimple } from "./User";
import { Post } from "./Post";

export interface WorkoutLog {
  id: string;
  user: UserSimple;
  exercises: ExerciseLog[];
  workout?: Pick<Workout, "id" | "name">;

  duration: Date;

  loggedAt: Date;
}

export interface ExerciseLog {
  id: string;
  exercise: Pick<Exercise, "id" | "name" | "image">;
  sets: SetLog[];

  enduranceCriteria: EnduranceCriteriaEnum;
}

export type ExerciseLogIsolated = ExerciseLog & {
  workoutLog: Pick<WorkoutLog, "id" | "workout" | "loggedAt">;
  post: Pick<Post, "id">;
};

export type ExerciseLogPreview = Omit<
  ExerciseLog,
  "sets" | "enduranceCriteria"
> & {
  sets: number;
};

export interface SetLog {
  id: string;

  reps?: number;
  time?: number;

  weight?: number;
  isWarmup: boolean;
}

export type WorkoutLogDraft = Omit<WorkoutLog, "exercises" | "user"> & {
  exercises: ExerciseLogDraft[];
};

export type ExerciseLogDraft = {
  exercise: Pick<Exercise, "id" | "name" | "image">;
  prescription?: Pick<
    WorkoutExercise,
    | "restDuration"
    | "superSetGroup"
    | "dropSetSize"
    | "authorNotes"
    | "enduranceCriteria"
    | "intensityCriteria"
  >;
  sets: SetLogDraft[];

  enduranceCriteria: EnduranceCriteriaEnum.Reps | EnduranceCriteriaEnum.Time;

  athleteNotes?: string;
  isFreestyle?: boolean;
};

export type SetLogDraft = Omit<SetLog, "id"> & {
  prescription?: Pick<
    WorkoutSet,
    "minReps" | "maxReps" | "targetTime" | "rpe" | "prPercentage" | "isAMRAP"
  >;

  done?: boolean;
  isFreestyle?: boolean;
};

// TODO: Omit id, users and workout from workoutlog
export type WorkoutLogDraftFormData = {
  exercises: ExerciseLogDraft[];
};
