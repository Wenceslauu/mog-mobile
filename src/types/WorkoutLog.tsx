export interface Post {
  author: {
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
