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
