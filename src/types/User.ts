import { NotificationType } from "./Activity";
import { PostPreview } from "./Post";
import { RoutinePreview } from "./Routine";

export interface User {
  id: string;

  name: string;
  fullName?: string;
  email: string;
  bio?: string;
  picture?: string;
  gender?: GenderEnum;

  birthday?: Date;
  joinedAt: Date;
  lastActiveAt: Date;
}

export enum GenderEnum {
  Male,
  Female,
  Other,
}

export type UserSimple = Pick<User, "id" | "name" | "picture">;

export interface UserGeneralSettings {
  id: string;

  privacy: UserPrivacyEnum;
  weightUnit: WeightUnitEnum;
}

export enum UserPrivacyEnum {
  Public,
  Private,
  Hidden,
}

export enum WeightUnitEnum {
  Kilograms,
  Pounds,
}

export interface UserNotificationSettings {
  id: string;

  notificationType: NotificationType;
  isEnabled: boolean;
}

export type Profile = Pick<
  User,
  "id" | "name" | "picture" | "bio" | "fullName"
> & {
  routines: RoutinePreview[];
  posts: PostPreview[];

  workouts: number;
  followers: number;
  following: number;
  isFollowed: boolean;
};

export type ProfilePreview = Pick<
  Profile,
  "id" | "name" | "picture" | "isFollowed"
>;
