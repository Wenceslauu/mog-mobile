import { Post, Comment } from "./Post";
import { Routine, RoutineReview } from "./Routine";
import { UserSimple } from "./User";

export interface Notification {
  id: string;
  triggerUser: UserSimple;
  routine?: Pick<Routine, "id" | "name">;
  review?: Pick<RoutineReview, "id" | "rating" | "description">;
  post?: Pick<Post, "id" | "message">;
  comment?: Pick<Comment, "id" | "message">;

  type: NotificationType;
  isRead: boolean;
  isSeen: boolean;

  triggeredAt: Date;
}

export enum NotificationType {
  Like,
  Comment,
  Athlete,
  Review,
  Follow,
}

export interface FollowRequest {
  id: string;
  requestorUser: UserSimple;

  status: FollowRequestStatus;
  isRead: boolean;
  isSeen: boolean;

  requestedAt: Date;
}

export enum FollowRequestStatus {
  Pending,
  Accepted,
  Rejected,
}
