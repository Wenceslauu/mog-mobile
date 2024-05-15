import {
  EnduranceCriteriaEnum,
  Exercise,
  IntensityCriteriaEnum,
} from "./Exercise";
import { UserSimple } from "./User";

export interface Routine {
  id: string;
  author: UserSimple;

  name: string;
  description: string;
  thumbnail?: string;
  category: RoutineCategoryEnum;
  // minDifficulty and maxDifficulty are aggregated in a single array for simplicity
  difficulty: RoutineDifficultyEnum[];
  equipment: RoutineEquipmentEnum;
  minFrequency: number;
  maxFrequency?: number;
  duration?: number;
  rating: number;
  numberOfReviews: number;
  // https://stackoverflow.com/questions/41139763/how-to-declare-a-fixed-length-array-in-typescript
  reviewsSample: [
    RoutineReview,
    RoutineReview,
    RoutineReview,
    RoutineReview,
    RoutineReview
  ];

  createdAt: Date;
  updatedAt?: Date;
}

export enum RoutineCategoryEnum {
  Bodybuilding,
  Powerlifting,
  "Bodyweight Fitness",
}

export enum RoutineDifficultyEnum {
  Beginner,
  Intermediate,
  Advanced,
}

export enum RoutineEquipmentEnum {
  "Full Gym",
  "Dumbbells Only",
  "At Home",
}

export interface RoutineReview {
  id: string;
  author: UserSimple;

  rating: number;
  description?: string;
  isHighlighted?: boolean;

  createdAt: Date;
  updatedAt?: Date;
}

export interface RoutineCycle {
  id: string;
  workouts: Workout[];

  name: string;
  duration?: number;
}

export interface Workout {
  id: string;
  exercises: WorkoutExercise[];

  name: string;
}

export interface WorkoutExercise {
  id: string;
  exercise: Pick<Exercise, "id" | "name" | "image" | "force">;
  sets: WorkoutSet[];

  restDuration?: number;
  authorNotes?: string;
  superSetGroup?: number;
  dropSetSize?: number;
  intensityCriteria: IntensityCriteriaEnum;
  enduranceCriteria: EnduranceCriteriaEnum;
}

export interface WorkoutSet {
  id: string;

  minReps?: number;
  maxReps?: number;
  targetTime?: number;
  isAMRAP?: true;

  rpe?: number;
  prPercentage?: number;
  
  isWarmup: boolean;
}

// IDs were optional due to the same types being used for both creation and edition
// Now they are mandatory for reordering on some routine-related types
// TODO: use Pick<> here rather than Omit<>
export type RoutineDraft = Omit<
  Routine,
  | "id"
  | "author"
  | "difficulty"
  | "category"
  | "equipment"
  | "minFrequency"
  | "maxFrequency"
  | "duration"
  | "createdAt"
  | "numberOfReviews"
  | "rating"
  | "reviewsSample"
> & {
  id?: string;
  cycles: RoutineCycleDraft[];

  difficulty?: RoutineDifficultyEnum[];
  category?: RoutineCategoryEnum;
  equipment?: RoutineEquipmentEnum;
};

export type RoutineCycleDraft = Omit<RoutineCycle, "id" | "workouts"> & {
  id?: string;
  workouts: WorkoutDraft[];
};

export type WorkoutDraft = Omit<Workout, "exercises"> & {
  exercises: WorkoutExerciseDraft[];
};

export type WorkoutExerciseDraft = Omit<WorkoutExercise, "sets"> & {
  sets: WorkoutSetDraft[];
};

export type WorkoutSetDraft = Omit<WorkoutSet, "id"> & {
  id?: string;
};

export type RoutineDraftGeneralFormData = Pick<
  Routine,
  "name" | "description" | "category" | "difficulty" | "equipment"
>;

export type WorkoutDraftFormData = {
  exercises: WorkoutExerciseDraftFormData[];
};

export type WorkoutExerciseDraftFormData = Omit<WorkoutExercise, "sets"> & {
  sets: Omit<WorkoutSet, "id">[];
};

export type RoutinePreview = Pick<
  Routine,
  | "id"
  | "author"
  | "name"
  | "thumbnail"
  | "category"
  | "difficulty"
  | "equipment"
  | "duration"
  | "minFrequency"
  | "maxFrequency"
  | "rating"
> & {
  // TODO
  numberOfAthletes: number;
};
