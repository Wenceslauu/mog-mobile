import { faker } from "@faker-js/faker";
import { createRandomUserSimple } from "./User";
import {
  Notification,
  FollowRequest,
  FollowRequestStatus,
  NotificationType,
} from "@/types/Activity";

export const createRandomNotification = (): Notification => {
  const type = faker.helpers.enumValue(NotificationType);

  const result: Notification = {
    id: faker.string.uuid(),
    triggerUser: createRandomUserSimple(),
    type,
    isRead: faker.datatype.boolean(),
    isSeen: faker.datatype.boolean(),
    triggeredAt: faker.date.past({ years: 1 }),
  };

  switch (type) {
    case NotificationType.Like:
      result.post = {
        id: faker.string.uuid(),
        message: faker.lorem.paragraph(),
      };
      break;
    case NotificationType.Comment:
      result.post = {
        id: faker.string.uuid(),
        message: faker.lorem.paragraph(),
      };
      result.comment = {
        id: faker.string.uuid(),
        message: faker.lorem.paragraph(),
      };
      break;
    case NotificationType.Athlete:
      result.routine = {
        id: faker.string.uuid(),
        name: faker.animal.dog(),
      };
      break;
    case NotificationType.Review:
      result.routine = {
        id: faker.string.uuid(),
        name: faker.animal.dog(),
      };
      result.review = {
        id: faker.string.uuid(),
        rating: faker.number.int({ min: 1, max: 5 }),
        description: faker.lorem.paragraph(),
      };
      break;
    case NotificationType.Follow:
      break;
  }

  return result;
};

export const createRandomFollowRequest = (): FollowRequest => {
  return {
    id: faker.string.uuid(),
    requestorUser: createRandomUserSimple(),

    status: faker.helpers.enumValue(FollowRequestStatus),
    isRead: faker.datatype.boolean(),
    isSeen: faker.datatype.boolean(),

    requestedAt: faker.date.past({ years: 1 }),
  };
};
