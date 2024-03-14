export interface Exercise {
  id: number;
  image?: any;
  name: string;
  isFavorite: boolean;
  personalBest: {
    weight: number;
    reps: number;
  };
  targetMuscle: string;
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
  targetMuscle: string;
}

export interface ExerciseSelectionSimple {
  id: number;
  image?: any;
  name: string;
  sets: [
    {
      reps: undefined;
      intensity: undefined;
    }
  ];
}
