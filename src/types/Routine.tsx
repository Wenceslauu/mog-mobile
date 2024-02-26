export interface Routine {
  id: number;
  thumbnail?: any;
  name: string;
  author: string;
  rating: number;
  category: string;
  daysPerWeek: string;
  duration: string;
  difficulty: string;
  equipment: string;
  numberOfAthletes: number;
}

export interface RoutineReview {
  id: number;
  author: {
    name: string;
    picture: string;
  };
  rating: number;
  text?: string;
  date: Date;
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
