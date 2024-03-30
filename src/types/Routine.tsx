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
    id: number;
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
