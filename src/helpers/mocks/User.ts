import { Profile, ProfilePreview, UserSimple } from "@/types/User";
import { faker } from "@faker-js/faker";
import { createRandomRoutinePreview } from "./Routine";
import { createRandomPostPreview } from "./Post";

export const createRandomUserSimple = (): UserSimple => {
  return {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    picture: faker.image.urlLoremFlickr({ category: "gym" }),
  };
};

export const createRandomProfile = (): Profile => {
  return {
    id: faker.string.uuid(),
    routines: Array.from({ length: 5 }, createRandomRoutinePreview),
    posts: Array.from({ length: 5 }, createRandomPostPreview),

    name: faker.internet.userName(),
    picture: faker.image.urlLoremFlickr({ category: "gym" }),
    bio: faker.lorem.paragraph(),
    fullName: faker.person.fullName(),
    workouts: faker.number.int({ min: 10, max: 200 }),
    followers: faker.number.int(1000),
    following: faker.number.int(1000),
    isFollowed: faker.datatype.boolean(),
  };
};

export const createRandomProfilePreview = (): ProfilePreview => {
  return {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    picture: faker.image.urlLoremFlickr({ category: "gym" }),
    isFollowed: faker.datatype.boolean(),
  };
};
