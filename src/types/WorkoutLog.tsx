export interface Post {
  id: number;
  author: {
    id: number;
    name: string;
    picture: string;
  };
  text: string;
  duration: string;
  volume: string;
  sets: number;
  likes: number;
  achievements: number;
  timestamp: Date;
  isLiked: boolean;
  comments: Comment[];
  exercises: ExerciseLogPreview[];
  images: any[];
}

export interface Comment {
  author: {
    id: number;
    name: string;
    picture: string;
  };
  text: string;
  timestamp: Date;
}

export interface ExerciseLogPreview {
  exerciseId: number;
  image?: any;
  name: string;
  sets: number;
}

export interface ExerciseLog {
  exerciseId: number;
  image?: string;
  name: string;
  sets: { reps: number; weight: number }[];
}

export interface WorkoutLogDraftFormData {
  exercises: {
    id: number;
    name: string;
    image?: string;
    authorNotes?: string;
    athleteNotes?: string;
    sets: SetLogDraft[];
  }[];
}

export interface SetLogDraft {
  targetIntensity?: number;
  targetReps?: number;
  weight: number;
  reps: number;
  done: boolean;
}
