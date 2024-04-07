export interface Notification {
  id: number;
  triggerUser: {
    id: number;
    name: string;
    image?: string;
  };
  routine?: {
    id: number;
    name: string;
  };
  review?: {
    id: number;
    rating: number;
    text: string;
  };
  post?: {
    id: number;
    text: string;
  };
  comment?: {
    id: number;
    text: string;
  };
  type: NotificationType;
  timestamp: Date;
  isSeen: boolean;
  isRead: boolean;
}

export enum NotificationType {
  Like,
  Comment,
  Athlete,
  Review,
  Follow,
}

export interface Request {
  id: number;
  requestorUser: {
    id: number;
    name: string;
    image?: string;
  };
  timestamp: Date;
  status: RequestStatus;
  isSeen: boolean;
  isRead: boolean;
}

export enum RequestStatus {
  Pending,
  Accepted,
  Rejected,
}
