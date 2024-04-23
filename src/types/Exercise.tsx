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
  targetMuscle: TargetMuscleEnum;
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

// export enum EquipmentEnum {

// }
// export type Equipment = keyof typeof EquipmentEnum;

export enum ForceEnum {
  Push,
  Pull,
  Isometric,
}
export type Force = keyof typeof ForceEnum;

export enum MechanicEnum {
  Compound,
  Isolation,
}
export type Mechanic = keyof typeof MechanicEnum;
