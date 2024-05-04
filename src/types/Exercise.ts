export interface Exercise {
  id: string;
  name: string;
  instructions: string;
  image?: string;
  targetMuscle: ExerciseTargetMuscleEnum;
  mechanic: ExerciseMechanicEnum;
  force: ExerciseForceEnum;
  isFavorite: boolean;
}

export enum ExerciseTargetMuscleEnum {
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

export enum ExerciseMechanicEnum {
  Compound,
  Isolation,
}

export enum ExerciseForceEnum {
  Push,
  Pull,
  Isometric,
}

export type ExerciseSimple = Pick<Exercise, "id" | "name" | "image">;

export type ExercisePreview = Pick<
  Exercise,
  "id" | "name" | "image" | "targetMuscle" | "mechanic" | "force" | "isFavorite"
>;

export type ExerciseSelection = Pick<
  Exercise,
  "id" | "name" | "image" | "isFavorite" | "targetMuscle" | "force"
>;

export type ExerciseSelectionSimple = Pick<
  Exercise,
  "id" | "name" | "image" | "force"
>;

export type ExerciseDraft = Pick<
  Exercise,
  | "id"
  | "name"
  | "instructions"
  | "image"
  | "targetMuscle"
  | "force"
  | "mechanic"
>;

export type ExerciseDraftFormData = Pick<
  Exercise,
  "name" | "instructions" | "targetMuscle" | "force" | "mechanic"
>;

export enum EnduranceCriteriaEnum {
  Reps,
  "Reps Range",
  "AMRAP",
  Time,
}

export enum IntensityCriteriaEnum {
  RPE,
  "% of 1RM",
}