export interface Notification {
  triggerUser: {
    id: number;
    name: string;
    image?: string;
  };
  routine?: {
    id: number;
    name: string;
  };
  post?: {
    id: number;
    text: string;
  };
  type: NotificationType;
  timestamp: Date;
  isRead: boolean;
}

export enum NotificationType {
  Like,
  Comment,
  Review,
  Follow,
  Athlete,
}
