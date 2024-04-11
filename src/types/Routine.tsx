export interface Routine {
  id: number;
  thumbnail?: any;
  name: string;
  author: {
    id: number;
    name: string;
    picture: string;
  };
  rating: number;
  category: CategoryEnum;
  daysPerWeek: string;
  duration: string;
  difficulty: DifficultyEnum;
  equipment: EquipmentEnum;
  numberOfAthletes: number;
}

export interface RoutineReview {
  id: number;
  author: {
    id: number;
    name: string;
    picture: string;
  };
  rating: number;
  text?: string;
  date: Date;
  highlighted?: boolean;
}

export interface Workout {
  name: string;
  exercises: {
    image?: any;
    name: string;
    exerciseId: number;
    sets: { number: number; reps: number; intensity: string }[];
  }[];
}

export interface RoutineDraft {
  name: string;
  description?: string;
  cycles: {
    name: string;
    duration?: number;
    workouts: {
      name: string;
      exercises: {
        id: number;
        name: string;
        image?: string;
        authorNotes?: string;
        restDuration?: number;
        sets: {
          reps?: number;
          intensity?: number;
        }[];
      }[];
    }[];
  }[];
}

export enum CategoryEnum {
  Bodybuilding,
  Powerlifting,
  "Bodyweight Fitness",
}
export type Category = keyof typeof CategoryEnum;

export enum DifficultyEnum {
  Beginner,
  Intermediate,
  Advanced,
}
export type Difficulty = keyof typeof DifficultyEnum;

export enum EquipmentEnum {
  "Full Gym",
  "Dumbbells Only",
  "At Home",
}
export type Equipment = keyof typeof EquipmentEnum;

export type DaysPerWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;
