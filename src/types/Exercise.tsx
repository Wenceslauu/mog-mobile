export interface Exercise {
  id: number;
  image?: any;
  name: string;
  isFavorite: boolean;
  personalBest: {
    weight: number;
    reps: number;
  };
  targetMuscle: TargetMuscleEnum;
}

export interface ExerciseLog {
  workoutLogId: number;
  workout: string;
  date: Date;
  sets: {
    reps: number;
    weight: number;
  }[];
}

export interface ExerciseSelection {
  id: number;
  image?: any;
  name: string;
  isFavorite: boolean;
  targetMuscle: TargetMuscle;
}

export interface ExerciseSelectionSimple {
  id: number;
  image?: any;
  name: string;
  sets: [{}];
}

export enum TargetMuscleEnum {
  Chest,
  Back,
  Quads,
  Hamstrings,
  Calves,
  Abs,
  Shoulders,
  Biceps,
  Triceps,
}
export type TargetMuscle = keyof typeof TargetMuscleEnum;
