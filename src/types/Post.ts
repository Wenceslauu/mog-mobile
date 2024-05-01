import { ExerciseLogPreview, WorkoutLog } from "./Log";
import { UserSimple } from "./User";

export interface Post {
  id: string;
  author: UserSimple;
  workoutLog: Pick<WorkoutLog, "id" | "exercises" | "duration" | "loggedAt"> & {
    volume: number;
    sets: number;
    achievements: number;
  };
  likes: UserSimple[];
  comments: Comment[];

  message?: string;
  images: string[];
  isLiked: boolean;
}

export type PostPreview = Omit<Post, "likes" | "workoutLog"> & {
  likes: number;
  workoutLog: Pick<WorkoutLog, "id" | "duration" | "loggedAt"> & {
    exercises: ExerciseLogPreview[];
    volume: number;
    sets: number;
    achievements: number;
  };
};

export interface Comment {
  id: string;
  author: UserSimple;

  message: string;
  isHighlighted?: boolean;

  createdAt: Date;
}
