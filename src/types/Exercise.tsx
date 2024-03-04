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
