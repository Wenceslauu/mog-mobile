import { faker } from "@faker-js/faker";
import { createRandomUserSimple } from "./User";
import { Comment, Post, PostPreview } from "@/types/Post";
import { createRandomExerciseLog, createRandomExerciseLogPreview } from "./Log";
import dayjs from "@/lib/dayjs";

export const createRandomPost = (): Post => {
  return {
    id: faker.string.uuid(),
    author: createRandomUserSimple(),
    workoutLog: {
      id: faker.string.uuid(),
      exercises: Array.from(
        { length: faker.number.int({ min: 1, max: 8 }) },
        createRandomExerciseLog
      ),
      achievements: faker.number.int(10),
      sets: faker.number.int(40),
      loggedAt: faker.date.recent(),
      volume: faker.number.int(20000),
      duration: dayjs()
        .hour(faker.number.int(2))
        .minute(faker.number.int(30))
        .toDate(),
    },
    comments: Array.from(
      { length: faker.number.int({ min: 1, max: 5 }) },
      createRandomComment
    ),

    message: faker.lorem.paragraph(),
    likes: Array.from({ length: faker.number.int(5) }, createRandomUserSimple),
    images: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () =>
      faker.image.urlLoremFlickr({ category: "fitness" })
    ),
    isLiked: faker.datatype.boolean(),
  };
};

export const createRandomPostPreview = (): PostPreview => {
  return {
    id: faker.string.uuid(),
    author: createRandomUserSimple(),
    workoutLog: {
      id: faker.string.uuid(),
      exercises: Array.from(
        { length: faker.number.int({ min: 1, max: 8 }) },
        createRandomExerciseLogPreview
      ),
      achievements: faker.number.int(10),
      sets: faker.number.int(40),
      loggedAt: faker.date.recent(),
      volume: faker.number.int(20000),
      duration: dayjs()
        .hour(faker.number.int(2))
        .minute(faker.number.int(30))
        .toDate(),
    },
    comments: Array.from(
      { length: faker.number.int({ min: 1, max: 5 }) },
      createRandomComment
    ),

    message: faker.lorem.paragraph(),
    likes: faker.number.int(1000),
    images: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () =>
      faker.image.urlLoremFlickr({ category: "fitness" })
    ),
    isLiked: faker.datatype.boolean(),
  };
};

export const createRandomComment = (
  isHighlighted: boolean = false
): Comment => {
  return {
    id: faker.string.uuid(),
    author: createRandomUserSimple(),
    createdAt: faker.date.recent(),
    message: faker.lorem.paragraph(),
    isHighlighted,
  };
};
